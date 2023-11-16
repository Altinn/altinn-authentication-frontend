import * as React from 'react';
// import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { AuthenticationPath } from '@/routes/paths';

import classes from './OverviewPageContent.module.css';
import { CollectionBar, ActionBar } from '@/components';
import { ReactComponent as Add } from '@/assets/Add.svg';
import { Button, Spinner } from '@digdir/design-system-react';
import { useMediaQuery } from '@/resources/hooks';
import { useTranslation } from 'react-i18next';


export const OverviewPageContent = () => {

  console.log(" ");
  console.log("Teller antall ganger OverviewPageContent rendres"); //Copilot!
  console.log("***********************************************");

  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  
  const reduxObjektArray = useAppSelector((state) => state.overviewPage.systemUserArray);

  // testet: tolerer initial rendering da reduxState er tom OK
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
        <div>
          <br></br>
        </div>
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
