import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { AuthenticationPath } from '@/routes/paths';

import classes from './OverviewPageContent.module.css';
import { CollectionBar, ActionBar } from '@/components';
import { ReactComponent as Add } from '@/assets/Add.svg';
import { Button, Spinner } from '@digdir/design-system-react';
import { useMediaQuery } from '@/resources/hooks';
import { useTranslation } from 'react-i18next';
import { resetPostConfirmation } from '@/rtk/features/creationPage/creationPageSlice';
import { fetchOverviewPage } from '@/rtk/features/overviewPage/overviewPageSlice';
import { use } from 'chai';


export const OverviewPageContent = () => {

  const dispatch = useAppDispatch();
  const reduxObjektArray = useAppSelector((state) => state.overviewPage.systemUserArray);
  const postConfirmed = useAppSelector((state) => state.creationPage.postConfirmed);
 
  
  useEffect(() => { 
    // if user reverts to OverviewPage aftrer New SystemUser creation,
    // we need to reset postConfirmed and do fetchOverviewPage here
    if (postConfirmed) {
      console.log("postConfirmed er true, kjører resetPostConfirmation() og fetchOverviewPage()");
      void dispatch(resetPostConfirmation()); 
      void dispatch(fetchOverviewPage());
    }
  }, [reduxObjektArray, postConfirmed ]);


  const { t } = useTranslation('common'); // not used yet
  const navigate = useNavigate();

  const reduxCollectionBarArray = () => {
    return reduxObjektArray.map( (SystemUser) => (
      <div key={SystemUser.id}>
        <CollectionBar
          title=  {SystemUser.integrationTitle}
          subtitle= { `${SystemUser.productName} (${SystemUser.ownedByPartyId})` }
          additionalText= {`${SystemUser.description}`} 
          color={'neutral'}
          collection={[]}
          compact={isSm}
          proceedToPath={ '/fixpath/' }
        />
      </div>
    ));
  };
  

  // Eldre greier: bør byttes ut, men kan trenges for Mobil-optimering
  const isSm = useMediaQuery('(max-width: 768px)'); // ikke i bruk lenger
  let overviewText: string;
  overviewText = t('authentication_dummy.auth_overview_text_administrere'); 
  // Fix-me: h2 below, not in Small/mobile view


  // Fix-me: setup dispatch for this step, if necessary:
  const goToStartNewSystemUser = () => {
    // dispatch(restoreAllSoftDeletedItems());
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Creation);
  };

  // Fix-me: CollectionBar links go nowhere yet

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
            {t('authentication_dummy.auth_new_system_user_opprett')}
          </Button>
        </div>
      
      <h2 className={classes.pageContentText}>
        {'Du har tidligere opprettet disse systembrukerne'} 
      </h2>
      { reduxCollectionBarArray() }
    </div>
  );
};
