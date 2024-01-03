import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { Button, Checkbox } from '@digdir/design-system-react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/resources/hooks';
import classes from './DirectConsentPageContent.module.css';
import { useTranslation } from 'react-i18next';


export const DirectConsentPageContent = () => {
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();
  const isSm = useMediaQuery('(max-width: 768px)');

  let overviewText: string;
  overviewText = t('authent_directconsentpage.sub_title'); // h2 below, not in Small/mobile view

  // skal nå bare gå tilbake til OverviewPage
  // selv om vi må vurdere en sletting av ting?
  const handleReject = () => {
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  }

   // Mulig at her skal man trigge en dispatch
  // og så navigere til OverviewPage
  // har opprettet en creationPageSlice som nå er synlig i 
  // Chrome DevTools --> må ut og løpe...
  const handleConfirm = () => {
    console.log("Her skulle det skjedd noe")
  }

  const handleCheck1 = () => {
    console.log("Her skulle det skjedd noe")
  }

  const handleCheck2 = () => {
    console.log("Her skulle det skjedd noe")
  }


  // Fix-me: Må sette inn lag med Page, PageContainer etc... så det ligner
  // på andre sider.

  return (

    <div className={classes.directConsentPageContainer}>

      <h2 className={classes.header}>{overviewText}</h2>
      <div className={classes.flexContainer}>
        <div className={classes.leftContainer}>

          <p className={classes.contentText}>
          {t('authent_directconsentpage.consent_text')}
          </p>

          <br></br>

          <p className={classes.contentText}>
          {t('authent_directconsentpage.consent_buttons_top_text')}
          </p>
          
          <div className={classes.checkboxContainer}>
            <div className={classes.confirmButton}>
              <Checkbox
                color='primary'
                size='small'
                onClick={handleCheck1}
              >
                {t('authent_directconsentpage.add_consent_checkbox1')} 
              </Checkbox> 
            </div>

            <div className={classes.confirmButton}>
              <Checkbox
                color='primary'
                size='small'
                onClick={handleCheck2}
              >
                {t('authent_directconsentpage.add_consent_checkbox2')} 
              </Checkbox> 
            </div>

          </div>
          <br></br>
          <br></br>

          <div className={classes.buttonContainer}>

            <div className={classes.confirmButton}>
              <Button
                color='primary'
                size='small'
                onClick={handleReject}
              >
                {t('authent_directconsentpage.add_consent_button1')} 
              </Button> 
              
            </div>

            <div className={classes.cancelButton}>
              <Button
                color='primary'
                variant='quiet'
                size='small'
                onClick={handleReject}
              >
                {t('authent_directconsentpage.add_consent_button2')} 
              </Button> 
               
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};
