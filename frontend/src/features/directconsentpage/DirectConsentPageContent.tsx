import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { Button, Spinner } from '@digdir/design-system-react';
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
  overviewText = t('authentication_dummy.auth_overview_text_directconsent'); // h2 below, not in Small/mobile view

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

  return (
    <div className={classes.overviewActionBarContainer}>

      {!isSm && <h2 className={classes.pageContentText}>{overviewText}</h2>}
      
            <p>
              <br></br>
            Fiken AS ber om tilgangsgrupper blir gitt til systemet. <br></br>
            Tilgangsgruppene vil gi systemintegrasjonen rett til <br></br>
            å aksessere digitale tjenester på vegne av Pølsebu AS<br></br> 
            <br></br>
              <a href="https://altinn.github.io/docs/"> Les mer her</a> og  
              <a href="https://docs.altinn.studio/nb/"> her</a>. 
            </p>
            <br></br>
            <p>
            Tilgangsgruppene er: <br></br>
              <br></br>
              - MVA (se tjenester)<br></br>
              - Sykemelding (se tjenester)
              <br></br>
            </p>
            <br></br>
            <p>
            Innholdet i tilgangsgruppene kan endre seg hvis nye
             tjenester for områdetet blir tilgjengelig.
            </p>
            
            <p>
            Tilgangsgruppene kan fjernes når som helst senere fra Altinn profil.
            </p>
      

            <div className={classes.buttonContainer}>

            <div className={classes.cancelButton}>
              <Button
                color='primary'
                variant='outline'
                size='small'
                onClick={handleReject}
              >
                Avbryt 
              </Button> 
            </div>

            <div className={classes.confirmButton}>
              <Button
                color='primary'
                size='small'
                onClick={handleConfirm}
              >
                Opprett 
              </Button> 
            </div>

          </div>

    </div>
  );
};
