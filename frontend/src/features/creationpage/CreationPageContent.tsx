import { TextField, Button, Select } from '@digdir/design-system-react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';

import { useMediaQuery } from '@/resources/hooks';

import classes from './CreationPageContent.module.css'; // ikke redigert ennå

// NOTE! this version of OverviewPageContent is for CreationPage
// CreationPage with sub-files must be reorganized and renamed


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
  const isSm = useMediaQuery('(max-width: 768px)');

  // brukes i h2, ikke vist i Small/mobile view
  let overviewText: string;
  overviewText = t('authentication_dummy.auth_overview_text_creation'); 

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
 

  return (
    <div className={classes.creationPageContainer}>
      <h2 className={classes.header}>{overviewText}</h2>  
      <div className={classes.flexContainer}>
        <div className={classes.leftContainer}>
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

        <div className={classes.rightContainer}>

          <p className={classes.contentText}>
            En systembruker kan i utgangspunktet kun benyttes av Pølsebu AS sine 
            egne maskinporten-klienter. 
            <a href="https://altinn.github.io/docs/"> Les mer her</a> og  
            <a href="https://docs.altinn.studio/nb/"> her</a>. 
          </p>

          <p className={classes.contentText}>
            Ved å velge en systemleverandør vil opprettet systembruker kunne 
            benyttes fra leverandørens system. Leverandørens system vil da ha 
            fullmaktene tildelt til systembrukeren.
          </p>

          <div className={classes.selectWrapper}>
            <Select
              label="Velg systemleverandør"
              options={testoptions}
              onChange={handleChangeInput}
              value={selected}
            />
          </div>

          <hr></hr>
            
          <div className={classes.confirmationWrapper}>
            <p>
              <b>Bekreft valgt systemleverandør : {selected}</b>
              <br></br>
              <b>Bekreft navn ny systembruker : {navn}</b>
              <br></br>
              <b>Bekreft beskrivelse ny systembruker: {beskrivelse}</b>

            </p>
          </div>

          <div className={classes.buttonContainer}>

            <div className={classes.cancelButton}>
              <Button
                color='danger'
              >
                AVBRYT 
              </Button> 
            </div>

            <div className={classes.confirmButton}>
              <Button
                color='success'
              >
                OPPRETT 
              </Button> 
            </div>

          </div>
        </div>      
      </div>
    </div>
  );
};
