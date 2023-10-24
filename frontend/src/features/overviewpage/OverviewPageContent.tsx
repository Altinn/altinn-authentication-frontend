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

  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const dispatch = useAppDispatch(); // fix-me: bygger kobling til REDUX CreationPage
  // for Runes Demo:
  const reduxNavn = useAppSelector((state) => state.creationPage.navn);
  const reduxBeskrivelse = useAppSelector((state) => state.creationPage.beskrivelse);
  const reduxSelected = useAppSelector((state) => state.creationPage.selected);
  
  
  // 24.10.23: Nytt SystemUserObject har nå 3 SUO i Redux
  // Lager presentasjons-funksjon reduxCollectionBarArray
  // der jeg stapper inn alle 6 feltene så får Rune og Mette 
  // komme opp med et design
  
  const reduxObjektArray = useAppSelector((state) => state.overviewPage.systemUserArray);

  // testet: tolerer initial rendering da reduxState er tom OK
  const reduxCollectionBarArray = () => {
    return reduxObjektArray.map( (SystemUser) => (
      <div key={SystemUser.id}>
        <CollectionBar
          title=  {SystemUser.title}
          subtitle= { `${SystemUser.systemType} (${SystemUser.ownedBy})` }
          additionalText= {`${SystemUser.description} (${SystemUser.controlledBy})`} 
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


      <CollectionBar
        title='System lakselus rapportering'
        subtitle='AQUA POWER'
        color={'neutral'}
        collection={[]}
        compact={isSm}
        proceedToPath={
          '/fixpath/'
        }
      />

      <div>
        <br></br>
      </div>

      <CollectionBar
        title='Økonomisystem'
        subtitle='VISMA ACCOUNTING'
        additionalText='Delegert til Visma AS'
        color={ 'neutral' }
        collection={[]}
        compact={isSm}
        proceedToPath={
          '/fixpath/'
        }
      />

      <div>
        <br></br>
      </div>

      { reduxNavn && (
      <CollectionBar
        title=  {reduxBeskrivelse}
        subtitle= { reduxSelected }
        additionalText= {reduxNavn}
        color={'neutral'}
        collection={[]}
        compact={isSm}
        proceedToPath={
          '/fixpath/'
        }
      />
      )}

    </div>
  );
};
