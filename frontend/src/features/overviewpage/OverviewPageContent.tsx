import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { AuthenticationPath } from '@/routes/paths';
import classes from './OverviewPageContent.module.css';
import { CollectionBar, ActionBar } from '@/components';
import { ReactComponent as Add } from '@/assets/Add.svg';
import { MinusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@digdir/design-system-react';
import { useMediaQuery } from '@/resources/hooks';
import { useTranslation } from 'react-i18next';
import { resetPostConfirmation } from '@/rtk/features/creationPage/creationPageSlice';
import { fetchOverviewPage } from '@/rtk/features/overviewPage/overviewPageSlice';


export const OverviewPageContent = () => {
  // Fix-me: CollectionBar links go nowhere yet

  const dispatch = useAppDispatch();
  const reduxObjektArray = useAppSelector((state) => state.overviewPage.systemUserArray);
  const postConfirmed = useAppSelector((state) => state.creationPage.postConfirmed);
 
  useEffect(() => { 
    // If user reverts to OverviewPage after New SystemUser creation,
    // using BrowserBackButton,
    // we need to reset postConfirmed and do fetchOverviewPage here
    if (postConfirmed) {
      void dispatch(resetPostConfirmation()); 
      void dispatch(fetchOverviewPage());
    }
  }, [reduxObjektArray, postConfirmed ]);

  const { t } = useTranslation('common'); // not used yet
  const navigate = useNavigate();

  // Fix-me: additionalText prop into CollectionBar is removed in Design of 24.11.23:
  // set to empty string for now: if this persists the props should be reorganized

  // Experiment 11.01.24: I need to find out what these bars do : code is from
  // AccMan repo: /src/features/singleRight/components/ResourceCollectionBar

  // this functional component selectedResourcesActionBars
  // is fed into the collection prop of CollectionBar, which I have
  // left empty so far. I hack resources to the new rights-array in Redux:
  // systemRegisterProductsArray: used in RightsIncludedPage

  const rightsObjektArray = useAppSelector((state) => state.rightsIncludedPage.systemRegisterProductsArray);

  const compact: boolean = false; // not used yet
  const handleClick = () => {
    console.log('handleClick');
  }; // Copilot

  // used in CollectionBar below
  const selectedResourcesActionBars = rightsObjektArray.map((ProductRight, index) => (
    <ActionBar
      key={index}
      title={ProductRight.right}
      subtitle={ProductRight.serviceProvider}
      size='small'
      color='success'
      actions={
        <Button
          variant='filled'
          size={compact ? 'medium' : 'small'}
          onClick={handleClick}
          icon={compact && <MinusCircleIcon title={t('common.remove')} />}
        >
          {!compact && t('common.remove')}
        </Button>
      }
    ></ActionBar>
  ));


  // added pilot right collection ( from above, was [] before)
  // Note! CollectionBar has so far been hard-coded in component to
  // say "Rettigheter ikke lagt til":
  // but should probably be responsive to whether collection input is empty
  const reduxCollectionBarArray = () => {
    return reduxObjektArray.map( (SystemUser) => (
      <div key={SystemUser.id}>
        <CollectionBar
          title=  {SystemUser.integrationTitle}
          subtitle= { `${SystemUser.productName}` }
          additionalText= {""} 
          color={'neutral'}
          collection={selectedResourcesActionBars}
          compact={isSm}
          proceedToPath={ '/fixpath/' }
        />
      </div>
    ));
  };
  

  // Eldre greier: bør byttes ut, men kan trenges for Mobil-optimering
  const isSm = useMediaQuery('(max-width: 768px)'); // ikke i bruk lenger

  let overviewText: string;
  overviewText = t('authent_overviewpage.sub_title'); // Fix-me: mulig skal settes direkte
  // Fix-me: h2 below, not in Small/mobile view

  const goToStartNewSystemUser = () => {
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Creation);
  };


  return (
    <div className={classes.overviewPageContainer}>

      <h2 className={classes.pageContentText}>{overviewText}</h2>
      
        <div className={classes.systemUserNewButton}>
          <Button
            variant='outline'
            onClick={goToStartNewSystemUser}
            icon={<Add />}
            fullWidth={isSm}
            size='medium'
          >
            {t('authent_overviewpage.new_system_user_button')}
          </Button>
        </div>
      
      <h2 className={classes.pageContentText}>
        {t('authent_overviewpage.existing_system_users_title')} 
      </h2>
      { reduxCollectionBarArray() }
    </div>
  );
};
