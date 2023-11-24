import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { postNewSystemUser, CreationRequest, resetPostConfirmation } from '@/rtk/features/creationPage/creationPageSlice';
import { fetchOverviewPage } from '@/rtk/features/overviewPage/overviewPageSlice';
import { TextField, Button, Select } from '@digdir/design-system-react';
import classes from './CreationPageContent.module.css';
import { useMediaQuery } from '@/resources/hooks';



export const CreationPageContent = () => {

  // Merk! Det er multiple design og datastruktur-valg som ikke er gjort ennå
  // som påvirker denne siden: dette er annotert nedunder

  // Local State variables for input-boxes and Nedtrekksmeny:
  const [integrationName, setIntegrationName] = useState('');

  // mulig denne skal populeres fra nedtrekksmeny?? Design mangler
  const [descriptionEntered, setDescriptionEntered] = useState(''); 
  
  
  const [selectedSystemType, setSelectedSystemType] = useState('');
  
  // const [vendorsArrayPopulated, setVendorsArrayPopulated] = useState(false); // not used yet

  const { t } = useTranslation('common'); // ikke i bruk ennå
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
  }

  const handlePostConfirmation = () => {
    // skrevet av Github Copilot
    void dispatch(resetPostConfirmation());
    void dispatch(fetchOverviewPage()); 
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  }

  // Per 15.11.23: we use a list of vendors for PullDownMenu directly from Redux
  const vendorsList : { label: string, value: string  }[] = useAppSelector((state) => state.creationPage.systemRegisterVendorsArray);

  // Håndterer skifte av valgmuligheter (options) i Nedtrekksmeny
  // Fix-me: Bør sjekke om DesignSystem dokumentasjon er oppdatert
  const handleChangeInput = (val: string) => {
    setSelectedSystemType(val);
  };

  const postConfirmed = useAppSelector((state) => state.creationPage.postConfirmed);
  const postConfirmationId = useAppSelector((state) => state.creationPage.postConfirmationId);
 
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
              options={ vendorsList }
              onChange={ handleChangeInput }
              value={ selectedSystemType }
            />
          </div>
        </div>

        <div className={classes.rightContainer}>
          

          { !postConfirmed &&
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
          }

          {
              postConfirmed && 
              <div className={classes.confirmationContainer}>

                <div className={classes.confirmationText}>
                  <p>Systembruker opprettet</p>
                </div>

                <div className={classes.confirmButton}>
                  <Button
                    color='success'
                    size='small'
                    onClick={handlePostConfirmation}
                  >
                    OK 
                  </Button> 
                </div>
              </div>
          }

        </div>      
      </div>
    </div>
  );
};
