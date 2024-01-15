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


  // Experiment 11.01.24: CollectionBar should have collection: experiment with
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

  
  // not used in ActionBar: but Button might be added back later
  const ButtonPlaceholder = () => {
    return (<></>)
  };

  // mock array for ActionBar array below: not rendered correctly
  // will access new currentRights API (see issue #8, no.8)
  // This array should probably have two properties per line: right (read, right...)
  // and a boolean on/off flag for whether it is active...
  const mockRightsActionsArray = [
    {"right_action": "Lese"},
    {"right_action": "Skrive"}, 
    {"right_action": "Signere"},
    {"right_action": "Les arkiv"}
  ];

  // INNERMOST LAYER of CollectionBar-inside-CollectionBar setup: used as collection below
  // ---> need to REWRITE COMPONENT for horizontal list of blue ovals
  //  (or red depending on action available)
  // ---> possibly AccMan has such a component already...
  // ---> or Designsystemet ---> tar det på Mac i morgen...
  // mangler også Info-tekst: subtitle={"Eventuell tekst om rettighetene kjem her."}
  const mockRightActionBars = mockRightsActionsArray.map((mockRightsActions, index) => (
    <ActionBar
      key={index}
      title={mockRightsActions.right_action}
      size='small'
      color='danger'
      actions={ButtonPlaceholder()}
    ></ActionBar>
  ));
  


  // MIDDLE LAYER of RightCollectionBar-inside-SystemUserCollectionBar setup
  // uses ActionBar-array inside collection
  // also CollectionBar has hardcoded "Rettigheter lagt til" ---> probaby need custom CollectionBar
  // for this MIDDLE LAYER
  const currentRightsCollectionBars = rightsObjektArray.map((ProductRight, index) => (
    <div key={index}>
      <CollectionBar
        title={ProductRight.right}
        subtitle={ProductRight.serviceProvider}
        color='success'
        collection={mockRightActionBars}
      ></CollectionBar>
    </div>
    
  ));




  // OUTERMOST LAYER of RightCollectionBar-inside-SystemUserCollectionBar setup
  const reduxCollectionBarArray = () => {
    return reduxObjektArray.map( (SystemUser, index) => (
      <div key={index}>
        <CollectionBar
          title=  {SystemUser.integrationTitle}
          subtitle= { `${SystemUser.productName}` }
          additionalText= {""} 
          color={'neutral'}
          collection={currentRightsCollectionBars}
          compact={isSm}
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
