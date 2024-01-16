import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { AuthenticationPath } from '@/routes/paths';
import classes from './OverviewPageContent.module.css';
import { CollectionBar } from '@/components';
import { ReactComponent as Add } from '@/assets/Add.svg';
import { MinusCircleIcon } from '@navikt/aksel-icons';
import { Button, Tag } from '@digdir/design-system-react';
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

  const rightsObjektArray = useAppSelector((state) => state.rightsIncludedPage.systemRegisterProductsArray);
  const compact: boolean = false; // not used yet

  // INNERMOST LAYER of RightCollectionBar-inside-SystemUserCollectionBar setup
  // mock array for ActionTags such as Read, Write, Sign etc: 
  // *********API not ready************
  // but should be flexible for future new actions, such as Rune´s Launch-Rocket
  const mockRightsActionsArray = [
    { "name" : "Lese", "on" : true  },
    { "name" : "Skrive", "on" : false },
    { "name" : "Signere", "on" : true  },
    { "name" : "Les arkiv", "on" : false },
    { "name" : "Launch-Rune´s-Rocket", "on" : true }
  ];


  // The Tags are mapped out of the mockRightsActionsArray 
  const onlyTags = mockRightsActionsArray.map((mockRightsActions, index) => (
    <div className={classes.tagSeparator}>
      <Tag
        key={index}
        size="large"
        color={ mockRightsActions.on ? "primary" : "danger" }
      >{mockRightsActions.name}</Tag>
    </div>
    
  ));

  // CollectionBar expects an array, so the Tags are wrapped as such
  // and a explanatory text is added (Design not in yet)
  const mockRightActionTags = [
    <div>
      <p>Eventuell tekst om rettighetene kommer her.</p>
      <div className={classes.rightActionTagsWrapper}>  
        {onlyTags}
      </div>
    </div>
  ];
  


  // MIDDLE LAYER of RightCollectionBar-inside-SystemUserCollectionBar setup
  // consumes Tag-array as collection
  // also CollectionBar has hardcoded "Rettigheter lagt til" ---> probaby need custom CollectionBar
  // for this MIDDLE LAYER: bars should not have "Rettigheter lagt til"

  const currentRightsCollectionBars = rightsObjektArray.map((ProductRight, index) => (
    <div key={index}>
      <CollectionBar
        title={ProductRight.right}
        subtitle={ProductRight.serviceProvider}
        color='success'
        collection={mockRightActionTags}
      ></CollectionBar>
    </div>
  ));

 
  // Add inner layer heading
  const middleLayerCollectionBarWrapperArray = [
    <div>
      <h3 className={classes.middleLayerHeading}>
        Systembrukeren har disse rettighetene:
      </h3>
      {currentRightsCollectionBars}
    </div>
  ];

  // OUTERMOST LAYER of RightCollectionBar-inside-SystemUserCollectionBar setup
  const reduxCollectionBarArray = () => {
    return reduxObjektArray.map( (SystemUser, index) => (
      <div key={index}>
        <CollectionBar
          title=  {SystemUser.integrationTitle}
          subtitle= { `${SystemUser.productName}` }
          additionalText= {""} 
          color={'neutral'}
          collection={middleLayerCollectionBarWrapperArray}
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
