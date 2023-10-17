import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';

import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { lagreNavnBeskrivelseKnapp } from '@/rtk/features/maskinportenPage/maskinportenPageSlice';

import { TextField, Button, Select } from '@digdir/design-system-react';
import classes from './MaskinportenIntAdmPageContent.module.css';
// import { useMediaQuery } from '@/resources/hooks';

import { UploadKomponent } from './UploadKomponent';



export const MaskinportenIntAdmPageContent = () => {
  
  // State variabler for input-bokser:
  const [navn, setNavn] = useState('');
  const [beskrivelse, setBeskrivelse] = useState('');


  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const dispatch = useAppDispatch(); // fix-me: koble opp til API
  const reduxNavn = useAppSelector((state) => state.maskinportenPage.navn);
  const reduxBeskrivelse = useAppSelector((state) => state.maskinportenPage.beskrivelse);

  // brukes i h2, ikke vist i Small/mobile view
  // const isSm = useMediaQuery('(max-width: 768px)'); // trengs denne?
  let overviewText: string;
  // overviewText = t('authentication_dummy.auth_overview_text_creation'); 
  overviewText = 'Opprett og administrer maskinporten integrasjon'; // flytt til språkstøtte

  // Går tilbake til startsiden
  const handleReject = () => {
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  }

 // Opprett-knapp flytter foreløpig bare 
  // local State for Navn og Beskrivelse
  // til Redux State, som er stabil så lenge app kjører
  // ---> tilgjengelig også fra andre sider
  // ---> API er ennå ikke tilgjengelig per 12.10.23
  // spørsmålet er om <UploadKomponent /> skal kjøre 
  // automatisk API kall om Redux-Navn og Redux-Beskrivelse er tilgjengelig
  // viss disse blir fylt ut etterpå... 

  // 

  // Dersom Redux state har både Navn, Beskrivelse og JWK fil
  // så kunne man her kjøre en Redux API kall som dytter disse 3
  // opp til BFF... 
  // men da må Navn og Beskrivelse komme seg til Redux på annen måte enn her...
  // kanskje når elementet mister fokus...

  // skal bare kjøres om disabled "Opprett" knapp er blitt aktivert...
  const handleConfirm = () => {
    dispatch(lagreNavnBeskrivelseKnapp( { navn: navn, beskrivelse: beskrivelse } ));
    setNavn('');
    setBeskrivelse('');
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
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

          <UploadKomponent />


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
                disabled
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
