import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { postNewSystemUser, CreationRequest, resetPostConfirmation } from '@/rtk/features/creationPage/creationPageSlice';
import { fetchOverviewPage } from '@/rtk/features/overviewPage/overviewPageSlice';
import { TextField, Button, Select } from '@digdir/design-system-react';
import classes from './RightsIncludedPageContent.module.css';
import { useMediaQuery } from '@/resources/hooks';
import { CollectionBar } from '@/components';



export const RightsIncludedPageContent = () => {

  // Dette er en ny side fra "Design av 5/12" (se Repo Wiki, med senere endringer tror jeg)
  // Siden er basert på ConfirmationPage og OverviewPage så koden er ikke finpusset ennå.
  // Merk! Det er nå denne RightsIncludedPageContent som skal kjøre POST til backend
  // og ikke CreationPageContent som tidligere.

  // denne skal hente array av RightsDTO fra Redux (henter nå bare systemUserArray a la OverviewPage)
  const reduxObjektArray = useAppSelector((state) => state.overviewPage.systemUserArray);


  // FIX-ME: Local State variables for input-boxes and Nedtrekksmeny:
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
 
  // Fetched from OverviewPage
  // Fix-me: additionalText prop into CollectionBar is removed in Design of 24.11.23:
  // set to empty string for now: if this persists the props should be reorganized
  const reduxRightsCollectionBarArray = () => {
    return reduxObjektArray.map( (SystemUser) => (
      <div key={SystemUser.id}>
        <CollectionBar
          title=  {SystemUser.integrationTitle}
          subtitle= { `${SystemUser.productName}` }
          additionalText= {""} 
          color={'neutral'}
          collection={[]}
          compact={isSm}
          proceedToPath={ '/fixpath/' }
        />
      </div>
    ));
  };

  return (
    <div className={classes.confirmationPageContainer}>

      <h2 className={classes.header}>{t('authent_includedrightspage.sub_title')}</h2>

      <p className={classes.contentText}>
        {t('authent_includedrightspage.content_text')}
      </p>


      <div className={classes.flexContainer}>
        <div className={classes.rightContainer}>
          
          <div className={classes.rightsArrayContainer}>
            { reduxRightsCollectionBarArray() }
          </div>

          <div className={classes.buttonContainer}>

            <div className={classes.addRightsButton}>
              <Button
                color='primary'
                size='small'
                onClick={handleReject}
              >
                {t('authent_includedrightspage.confirm_button')} 
              </Button> 
            </div>
            <div className={classes.addNoRightsButton}>
              <Button
                color='primary'
                variant='outline'
                size='small'
                onClick={handleReject}
              >
                {t('authent_includedrightspage.cancel_button')} 
              </Button> 
            </div>
          </div>
          

        </div>      
      </div>
    </div>
  );
};
