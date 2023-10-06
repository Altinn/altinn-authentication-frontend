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

  // State variabel for nedtrekksmeny:
  const [selected, setSelected] = useState(''); 

  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // fix-me: bygg kobling til REDUX 
  // const overviewOrgs = useAppSelector((state) => state.overviewOrg.overviewOrgs);
  

  // brukes i h2, ikke vist i Small/mobile view
  const isSm = useMediaQuery('(max-width: 768px)'); // trengs denne?
  let overviewText: string;
  // overviewText = t('authentication_dummy.auth_overview_text_creation'); 
  overviewText = 'Opprett og administrer maskinporten integrasjon'; // flytt til språkstøtte

  // skal nå bare gå tilbake til OverviewPage
  // selv om vi må vurdere en sletting av ting?
  const handleReject = () => {
    setNavn('');
    setBeskrivelse('');
    setSelected('');
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  }

  // Mulig at her skal man trigge en dispatch
  // og så navigere til OverviewPage
  // har opprettet en creationPageSlice som nå er synlig i 
  // Chrome DevTools --> må ut og løpe...
  const handleConfirm = () => {
    setNavn('ReduxLagret');
    setBeskrivelse('ReduxLagret');
    setSelected('');
  }


  
  
  // Håndterer skifte av valgmuligheter (options) i Nedtrekksmeny
  const handleChangeInput = (val: string) => {
    setSelected(val);
  };
  // const minInputId:string = "inputIdString"; // valg id trengs ikke?

  // Dette er mest for knapper og videre navigering,
  // mens her er <Link> kanskje bedre: fra Studio Dashboard
  // men bør også sjekke Designsystemet om de har noe på gang der
  const handleSkiftTilCustomCreationPage = () => {
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.CustomCreation);
  };
 
  return (
    <div className={classes.creationPageContainer}>
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

          <p className={classes.contentText}>
            
          <br></br>
            Last opp i jwk i format <br></br>
            
            <div className={classes.uploadButton}>
              <Button
                color='primary'
                variant='outline'
                size='small'
                onClick={handleReject}
              >
                Choose File 
              </Button>
              <span>No file chosen</span> 
            </div>
            <br></br>
            
          </p>

          <p className={classes.warningUpdateText}>
            <b>
              Maskinporten krever at du oppdaterer JWK hver 12. måned.
              Hvis JWK ikke oppdateres vil integrasjon slutte å virke.
            </b>
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
