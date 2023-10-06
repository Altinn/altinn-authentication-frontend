import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { TextField, Button, Select } from '@digdir/design-system-react';
import classes from './CustomCreationPageContent.module.css'; 
import { useMediaQuery } from '@/resources/hooks';

// Kopiert fra CreationPage: mye må ryddes vekk her og
// erstattes med Runes spesialflyt #3

export const CustomCreationPageContent = () => {
  
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
  overviewText = t('authentication_dummy.auth_overview_text_creation'); 


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


  

  
  // options med label skilt fra value (samme verdi for demo)
  // use inline interface definition for Type her
  // https://stackoverflow.com/questions/35435042/how-can-i-define-an-array-of-objects
  let testoptions: { label: string, value: string  }[] = [
    {
      "label": "",
      "value": ""
    },
    {
      "label": "SELV-VALGT VALG1",
      "value": "SELV-VALGT VALG1"
    },
    {
      "label": "SELV-VALGT VALG2",
      "value": "SELV-VALGT VALG2"
    },
  ]; 
  
  // merk at Storyboard dokumentasjon på Designsystemet SELECT
  // skiller mellom "label" og "value"
  // "value er verdien som brukes av onChange-funksjonen.
  // label er teksten som vises i listen.""

  // TextField er også importert fra Designsystemet,
  // men selv om size="medium" er nevnt i første linje i Docs på Storyboard
  // så er det ikke godtatt i importert TextField
  // Faktisk er ikke TextField nevnt i Storyboard, men Textfield [SIC!]
  // ---> Dokumentasjon er fortsatt ikke det helt store for Digdir...
  // Nå er vel sikkert størrelse flyttet inn i CSS eller noe... 
  // som igjen er gjemt i Figma Tokens... Herre!

  
  // Håndterer skifte av valgmuligheter (options) i Nedtrekksmeny
  const handleChangeInput = (val: string) => {
    setSelected(val);
  };
  // const minInputId:string = "inputIdString"; // valg id trengs ikke?
 
 

  return (
    <div className={classes.customCreationPageContainer}>
      <h2 className={classes.header}>{overviewText}</h2>  
      <div className={classes.flexContainer}>
        <div className={classes.leftContainer}>
          <div className={classes.nameWrapper}>
            <TextField 
              label = 'Navn: spesial'
              value = { navn }
              onChange={e => setNavn(e.target.value)}
            />
          </div>

          <div className={classes.descriptionWrapper}>
            <TextField 
              label= 'Beskrivelse av spesial' 
              value = { beskrivelse }
              onChange={e => setBeskrivelse(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.rightContainer}>

          <p className={classes.contentText}>
            Du er i gang med å opprette en SELV-VALGT leverandør. 
            Den SELV-VALGTE leverandørens system vil da ha 
            fullmaktene tildelt til systembrukeren. Systembrukeren må 
            knyttes mot organisasjonens egen integrasjon i maskinporten
            eller et system tilbydt av en selv-valgt leverandør. 
          </p>

          <p className={classes.contentText}>
            For å velge en FORHÅNDSGODKJENT systemleverandør klikk  
            <Link
            to={'/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Creation}
            > her</Link> 
          </p>

          <div className={classes.selectWrapper}>
            <Select
              label="Velg maskinporten integrasjon"
              options={testoptions}
              onChange={handleChangeInput}
              value={selected}
              error={true}
            />
          </div>

          
            
         

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
