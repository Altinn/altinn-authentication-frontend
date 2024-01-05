import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { postNewSystemUser, CreationRequest, resetPostConfirmation } from '@/rtk/features/creationPage/creationPageSlice';
import { fetchOverviewPage } from '@/rtk/features/overviewPage/overviewPageSlice';
import { TextField, Button, Select, HelpText } from '@digdir/design-system-react';
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
    
    // Clean up local State variables before returning to main page, was old solution
    // update 07.12.23: New Design of 24.11.23 specifies navigation
    // to ConfirmationPage: OK, but if CreationRequest fails we need to
    // notify the user, but perhaps we could do it on the ConfirmationPage?
    setIntegrationName('');
    setDescriptionEntered('');
    setSelectedSystemType('');

    // Crude first pass at problem: no Error handling here or at ConfirmationPage OK
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Confirmation);
  }

  // The old solution: waited for confirmation before
  // navigating to OverviewPage: 
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
            label = {t('authent_creationpage.input_field_label')} 
            value = { integrationName }
            onChange={e => setIntegrationName(e.target.value)}
          />   
        </div>
        <div className={classes.nameWrapper}>
          <HelpText
            size="small"
            title="Hjelpetekst for systembrukar"
          >
            Hjelpetekst for systembrukar
          </HelpText>
          </div>
      </div>

      <h2 className={classes.header}>{t('authent_creationpage.sub_title')}</h2>

      <p className={classes.contentText}>
        {t('authent_creationpage.content_text1')}
      </p>

      <p className={classes.contentText}>
        {t('authent_creationpage.content_text2')}
      </p>

      <div className={classes.flexContainer}>
        <div className={classes.leftContainer}>
          <div className={classes.selectWrapper}>
            <Select
              label={t('authent_creationpage.pull_down_menu_label')}
              options={ vendorsList }
              onChange={ handleChangeInput }
              value={ selectedSystemType }
            />
          </div>
        </div>

        <div className={classes.rightContainer}>
          

          { !postConfirmed &&
          <div className={classes.buttonContainer}>
            <div className={classes.confirmButton}>
              <Button
                color='primary'
                size='small'
                onClick={handleConfirm}
              >
                {t('authent_creationpage.confirm_button')} 
              </Button> 
            </div>
            <div className={classes.cancelButton}>
              <Button
                color='primary'
                variant='quiet'
                size='small'
                onClick={handleReject}
              >
                {t('authent_creationpage.cancel_button')} 
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
