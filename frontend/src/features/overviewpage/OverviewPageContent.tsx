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

  const dispatch = useAppDispatch(); // fix-me: bygger kobling til REDUX 
  const reduxNavn = useAppSelector((state) => state.creationPage.navn);
  const reduxBeskrivelse = useAppSelector((state) => state.creationPage.beskrivelse);
  const reduxSelected = useAppSelector((state) => state.creationPage.selected);
  
  // dette fungerer fint --> mulig at jeg skal lage kumulativ liste over systembrukere??
  // da måtte jeg ha en katalog av brukere, der de to alleredei OverviewPage var først,
  // men så øker det på nedover... 

  const isSm = useMediaQuery('(max-width: 768px)'); // ikke i bruk lenger

  let overviewText: string;
  overviewText = t('authentication_dummy.auth_overview_text_administrere'); 
  // Fix-me: h2 below, not in Small/mobile view


  // Fix-me: setup dispatch for this step, if necessary:
  const goToStartNewSystemUser = () => {
    // dispatch(restoreAllSoftDeletedItems());
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Creation);
  };

  // Fix-me: CollectionBar links go nowhere


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