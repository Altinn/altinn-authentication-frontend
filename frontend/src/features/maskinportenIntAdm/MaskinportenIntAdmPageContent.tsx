import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { TextField, Button, Select } from '@digdir/design-system-react';
import classes from './MaskinportenIntAdmPageContent.module.css';
import { useMediaQuery } from '@/resources/hooks';


export const MaskinportenIntAdmPageContent = () => {
  
  // State variabler for input-bokser:
  const [navn, setNavn] = useState('');
  const [beskrivelse, setBeskrivelse] = useState('');


  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // fix-me: bygg kobling til REDUX 
  // const overviewOrgs = useAppSelector((state) => state.overviewOrg.overviewOrgs);
  

  // brukes i h2, ikke vist i Small/mobile view
  // const isSm = useMediaQuery('(max-width: 768px)'); // trengs denne?
  let overviewText: string;
  // overviewText = t('authentication_dummy.auth_overview_text_creation'); 
  overviewText = 'Opprett og administrer maskinporten integrasjon'; // flytt til språkstøtte

  const handleReject = () => {
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  }

  // Mulig at her skal man trigge en dispatch
  // og så navigere til OverviewPage
  const handleConfirm = () => {
    setNavn('ReduxLagret');
    setBeskrivelse('ReduxLagret');
  }


 
  return (
    <div className={classes.maskinportenPageContainer}>
      <h2 className={classes.header}>{overviewText}</h2>  
      <div className={classes.flexContainer}>
        
        <div className={classes.leftContainer}>
          
          <div className={classes.nameWrapper}>
            <TextField 
              label = 'Navn'
              type = 'text'
              value = { navn }
              onChange={e => setNavn(e.target.value)}
            />
          </div>

          <div className={classes.descriptionWrapper}>
            <TextField 
              label= 'Beskrivelse' 
              type = 'text'
              value = { beskrivelse }
              onChange={e => setBeskrivelse(e.target.value)}
            />
          </div>

          <p className={classes.jwkContentText}>
            Last opp i jwk i format
          </p>  

          <div className={classes.uploadButtonContainer}>

            <div className={classes.uploadButtonWrapper}>
              <Button
                color='primary'
                variant='outline'
                size='small'
                onClick={handleReject}
              >
                Choose File 
              </Button>  
            </div>

            <div className={classes.fileChosenTextWrapper}>
              <span>No file chosen</span> 
            </div>
            
          </div>
          

          <p className={classes.warningUpdateText}>
              Maskinporten krever at du oppdaterer JWK hver 12. måned.
              Hvis JWK ikke oppdateres vil integrasjonen slutte å virke.
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

              
      </div>
    </div>
  );
};
