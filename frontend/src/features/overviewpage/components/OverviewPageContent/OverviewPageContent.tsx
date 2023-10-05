import { Button, Spinner } from '@digdir/design-system-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { ReactComponent as Add } from '@/assets/Add.svg';
import { useMediaQuery } from '@/resources/hooks';
import { AuthenticationPath } from '@/routes/paths';
import classes from './OverviewPageContent.module.css';
import { ErrorPanel, CollectionBar, ActionBar } from '@/components';


export const OverviewPageContent = () => {

  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSm = useMediaQuery('(max-width: 768px)');

  let fetchData: () => any;

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
    <div className={classes.overviewActionBarContainer}>

      {!isSm && <h2 className={classes.pageContentText}>{overviewText}</h2>}
      
        <div className={classes.delegateNewButton}>
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
      
      <div>
        <br></br><br></br><br></br>
      </div>

      {!isSm && <h2 className={classes.pageContentText}>
        {'Du har tidligere opprettet disse systembrukerne'} 
      </h2>} 
        

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

    </div>
  );
};
