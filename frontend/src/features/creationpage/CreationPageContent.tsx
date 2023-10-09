import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { TextField, Button, Select } from '@digdir/design-system-react';
import classes from './CreationPageContent.module.css';
import { useMediaQuery } from '@/resources/hooks';


export const CreationPageContent = () => {
  
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
  overviewText = 'Knytt systembruker til systemleverandør'; 


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
      "label": "Microsoft Norge PowerBI",
      "value": "Microsoft Norge PowerBI"
    },
    {
      "label": "Visma SuperTax",
      "value": "Visma SuperTax"
    },
    {
      "label": "Aqua Nor Aqua Master",
      "value": "Aqua Nor Aqua Master"
    },
    {
      "label": "Fiken Business Power",
      "value": "Fiken Business Power"
    },
    {
      "label": "PostNord Strålboks",
      "value": "PostNord Strålboks"
    }
  ]; // merk at Storyboard dokumentasjon på Designsystemet
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

  // Dette er mest for knapper og videre navigering,
  // mens her er <Link> kanskje bedre: fra Studio Dashboard
  // men bør også sjekke Designsystemet om de har noe på gang der
  const handleSkiftTilCustomCreationPage = () => {
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.CustomCreation);
  };
 
 
  return (
    <div className={classes.creationPageContainer}>
      <div className={classes.inputContainer}> 
        <div className={classes.nameWrapper}>
            <TextField 
              label = 'Navn'
              value = { navn }
              onChange={e => setNavn(e.target.value)}
            />
        </div>
        <div className={classes.descriptionWrapper}>
            <TextField 
              label= 'Beskrivelse' 
              value = { beskrivelse }
              onChange={e => setBeskrivelse(e.target.value)}
            />
        </div>
      </div>

      <h2 className={classes.header}>{overviewText}</h2>

      <p className={classes.contentText}>
            I de fleste tilfeller vil systembrukeren benyttes i sammenheng med 
            sluttbrukersystemer levert av forskjellige leverandører. Det er en 
            rekke leverandører og systemer i markedet som tilbyr systemer 
            for forskjellig bruk. Du må selv gjøre en selvstendig vurdering på valg 
            av leverandør og system. Nedenfor listes alle leverandører og systemer 
            som har meldt at de leverer slike tjenester. Altinn har ikke gjort noen 
            vurdering av disse.
      </p>


      <div className={classes.flexContainer}>
        <div className={classes.leftContainer}>
          <div className={classes.selectWrapper}>
            <Select
              label="Velg systemleverandør og system"
              options={testoptions}
              onChange={handleChangeInput}
              value={selected}
            />
          </div>
        </div>

        <div className={classes.rightContainer}>
          <h3 className={classes.header}>Eget system?</h3>
          <p className={classes.contentText}>
            Hvis du har et eget system du ønsker å benytte, 
            opprett integrasjon i maskinporten 
            <Link
            to={'/' + AuthenticationPath.Auth + '/' + AuthenticationPath.MaskinportenAdm}
            > her</Link> 
            .
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
