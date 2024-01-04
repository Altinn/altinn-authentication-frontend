import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { storeCheckbox1, storeCheckbox2 } from '@/rtk/features/directConsentPage/directConsentPageSlice';
import { Button, Checkbox } from '@digdir/design-system-react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/resources/hooks';
import classes from './DirectConsentPageContent.module.css';
import { useTranslation } from 'react-i18next';


export const DirectConsentPageContent = () => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  // Fix-me: synchronize Redux state og local state
  // const checkbox1State: boolean = useAppSelector((state) => state.directConsentPage.checkbox1);
  // or just fix simple boolean reversion inside Reducer function: but 

  const { t } = useTranslation('common');
  const navigate = useNavigate();
  
  const dispatch = useAppDispatch(); // Redux for DirectConsentPage: design not ready
  const isSm = useMediaQuery('(max-width: 768px)');

  let overviewText: string;
  overviewText = t('authent_directconsentpage.sub_title'); // h2 below, not in Small/mobile view

  // for now, return to OverviewPage: design not ready
  const handleReject = () => {
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  }

  // possibly handleConfirm should be dependent on both checkboxes
  // being checked... or perhaps ConfirmButton should be disabled
  const handleConfirm = () => {
    console.log("Her skulle det skjedd noe")
  }

  const handleCheck1 = () => {
    // Fix-me: could probably simplify in Reducer itself
    const invertedCheckbox1State: boolean = !checkbox1;
    setCheckbox1(invertedCheckbox1State); // update local state
    dispatch(storeCheckbox1( { checkbox1: invertedCheckbox1State} )); 
  }

  const handleCheck2 = () => {
    // Fix-me: could probably simplify in Reducer itself
    const invertedCheckbox2State: boolean = !checkbox2;
    setCheckbox2(invertedCheckbox2State); // update local state
    dispatch(storeCheckbox2( { checkbox1: invertedCheckbox2State} )); 
  }

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
                disabled={!checkbox1 || !checkbox2}
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
