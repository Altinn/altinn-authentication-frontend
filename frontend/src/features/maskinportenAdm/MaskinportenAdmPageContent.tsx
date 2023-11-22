import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { lagreNavn, lagreBeskrivelse } from '@/rtk/features/maskinportenPage/maskinportenPageSlice';
import { TextField } from '@digdir/design-system-react';
import classes from './MaskinportenAdmPageContent.module.css';
// import { useMediaQuery } from '@/resources/hooks';
import { UploadComponent } from './UploadComponent';


export const MaskinportenAdmPageContent = () => {
  
  const { t } = useTranslation('common');

  // Redux variabler
  const dispatch = useAppDispatch(); 
  const reduxNavn = useAppSelector((state) => state.maskinportenPage.navn);
  const reduxBeskrivelse = useAppSelector((state) => state.maskinportenPage.beskrivelse);
  const reduxOnJwkFileAvailable = useAppSelector((state) => state.maskinportenPage.onJwkFileAvailable);

  // regulate upLoad button inside <UploadComponent />
  let opprettKnappBlokkert = true;
  if (reduxNavn && reduxBeskrivelse && reduxOnJwkFileAvailable ) { 
    opprettKnappBlokkert = false;
  } 

  // State variabler brukt for dynamisk oppdatering av Navn og Beskrivelse felt 
  const [navn, setNavn] = useState('');
  const [beskrivelse, setBeskrivelse] = useState('');

  
  // brukes i h2, ikke vist i Small/mobile view
  // const isSm = useMediaQuery('(max-width: 768px)'); // trengs denne?
  let overviewText: string;
  // overviewText = t('authentication_dummy.auth_overview_text_creation'); 
  overviewText = 'Opprett og administrer maskinporten integrasjon'; // flytt til språkstøtte

  const handleOnBlurNavn = () => {
    dispatch(lagreNavn( { navn: navn} ));
  }

  const handleOnBlurBeskrivelse = () => {
    dispatch(lagreBeskrivelse( { beskrivelse: beskrivelse} ));
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
              onChange=
              {e => setNavn(e.target.value)}
              onBlur = {handleOnBlurNavn}
            />
          </div>

          <div className={classes.descriptionWrapper}>
            <TextField 
              label= 'Beskrivelse' 
              type = 'text'
              value = { beskrivelse }
              onChange={e => setBeskrivelse(e.target.value)}
              onBlur = {handleOnBlurBeskrivelse}
            />
          </div>

          <p className={classes.jwkContentText}>
            Last opp i jwk i format
          </p>  

          <UploadComponent opprettKnappBlokkert={opprettKnappBlokkert} />
        </div>    
      </div>
    </div>
  );
};
