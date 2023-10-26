import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch } from '@/rtk/app/hooks';
import { postNewSystemUser, CreationRequest } from '@/rtk/features/creationPage/creationPageSlice';
import { TextField, Button, Select } from '@digdir/design-system-react';
import classes from './CreationPageContent.module.css';
import { useMediaQuery } from '@/resources/hooks';


export const CreationPageContent = () => {
  
  // Local State variables for input-boxes and Nedtrekksmeny:
  const [integrationName, setIntegrationName] = useState('');
  const [descriptionEntered, setDescriptionEntered] = useState('');
  const [selectedSystemType, setSelectedSystemType] = useState(''); 

  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 
  
  // brukes i h2, ikke vist i Small/mobile view
  const isSm = useMediaQuery('(max-width: 768px)'); // fix-me: trengs denne?
  let overviewText: string;
  overviewText = 'Knytt systembruker til systemleverandør'; 

  const handleReject = () => {
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  }

  const handleConfirm = () => {
    // POST 3 useState variables, while the last two not yet implemented
    const PostObjekt: CreationRequest = {
      integrationTitle: integrationName,
      description: descriptionEntered,
      selectedSystemType: selectedSystemType,
      clientId: "notImplemented",
      ownedByPartyId: "notImplemented"
    };

    void dispatch(postNewSystemUser(PostObjekt));  
    
    // Clean up local State variables before returning to main page
    setIntegrationName('');
    setDescriptionEntered('');
    setSelectedSystemType('');

    // NB! navigasjon til OverviewPage skal vise med ny GET request den nye SystemBruker
    // ettersom vi ikke har noen annen suksess-melding ennå:
    // Men vi har creationPageSlice status "posted" nå... men den virker bare først gang
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  }


  // MOCK VALUES for NedtrekksMeny: List of Firms/Products not available from BFF yet
  // options med label skilt fra value (samme verdi for demo)
  // use inline interface definition for Type her
  // https://stackoverflow.com/questions/35435042/how-can-i-define-an-array-of-objects
  let testoptions: { label: string, value: string  }[] = [
    {
      "label": "",
      "value": ""
    },
    {
      "label": "Visma AS (936796702): Visma Økonomi",
      "value": "Visma AS (936796702): Visma Økonomi"
    },
    {
      "label": "Visma AS (936796702): Visma HR",
      "value": "Visma AS (936796702): Visma HR"
    },
    {
      "label": "4Human AS (897757222): 4Human HRM",
      "value": "4Human AS (897757222): 4Human HRM"
    },
    {
      "label": "Aqua Group (931693670): Salmon King",
      "value": "Aqua Group (931693670): Salmon King"
    },
    {
      "label": "Snekkerbua ANS (92341234): Materialadmin",
      "value": "Snekkerbua ANS (92341234): Materialadmin"
    },
    {
      "label": "Vei og bil AS (9234523423): Prikk remover",
      "value": "Vei og bil AS (9234523423): Prikk remover"
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
    setSelectedSystemType(val);
  };
 
  return (
    <div className={classes.creationPageContainer}>
      <div className={classes.inputContainer}> 
        <div className={classes.nameWrapper}>
            <TextField 
              label = 'Integrasjonsnavn'
              value = { integrationName }
              onChange={e => setIntegrationName(e.target.value)}
            />
        </div>
        <div className={classes.descriptionWrapper}>
            <TextField 
              label= 'Beskrivelse' 
              value = { descriptionEntered }
              onChange={e => setDescriptionEntered(e.target.value)}
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
              value={selectedSystemType}
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
