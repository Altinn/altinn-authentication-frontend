import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { storeCheckbox1, storeCheckbox2 } from '@/rtk/features/directConsentPage/directConsentPageSlice';
import { postNewSystemUser, CreationRequest } from '@/rtk/features/creationPage/creationPageSlice';
import { Button, Checkbox } from '@digdir/design-system-react';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/resources/hooks';
import classes from './DirectConsentPageContent.module.css';
import { useTranslation } from 'react-i18next';
import { RightsCollectionBar } from '@/components';


export const DirectConsentPageContent = () => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  // Fix-me: synchronize Redux state og local state
  // const checkbox1State: boolean = useAppSelector((state) => state.directConsentPage.checkbox1);
  // or just fix simple boolean reversion inside Reducer function: but 

  const { t } = useTranslation('common');
  const navigate = useNavigate();
  
  const dispatch = useAppDispatch(); // Redux for DirectConsentPage: design not ready
  const isSm = useMediaQuery('(max-width: 768px)');

  let overviewText: string;
  overviewText = t('authent_directconsentpage.sub_title'); // h2 below, not in Small/mobile view

  // for now, return to OverviewPage: design not ready
  const handleReject = () => {
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  }

  // confirm is a temporary solution, as backend and Maskinporten is not ready
  // is to dispatch a mock systemUser object and return to OverviewPage
  const handleConfirm = () => {
    const PostObjekt: CreationRequest = {
      integrationTitle: "Direkte Tilgangsløsning",
      selectedSystemType: "direct_consent_system : Direct Consent System",
    };
    void dispatch(postNewSystemUser(PostObjekt));  
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  }

  const handleCheck1 = () => {
    // Fix-me: could probably simplify in Reducer itself
    const invertedCheckbox1State: boolean = !checkbox1;
    setCheckbox1(invertedCheckbox1State); // update local state
    dispatch(storeCheckbox1( { checkbox1: invertedCheckbox1State} )); 
  }

  const handleCheck2 = () => {
    // Fix-me: could probably simplify in Reducer itself
    const invertedCheckbox2State: boolean = !checkbox2;
    setCheckbox2(invertedCheckbox2State); // update local state
    dispatch(storeCheckbox2( { checkbox1: invertedCheckbox2State} )); 
  }

  const reduxObjektArray = useAppSelector((state) => state.rightsIncludedPage.systemRegisterProductsArray);

  // Note: array key set to ProductRight.right, which should be unique
  // additionalText is not used yet
  // and we probably need a CollectionBar without button at right side
  const reduxRightsCollectionBarArray = () => {
    return reduxObjektArray.map( (ProductRight) => (
      <div key={ProductRight.right}>
        <RightsCollectionBar
          title=  {ProductRight.right}
          subtitle= { `${ProductRight.serviceProvider}` }
          additionalText= {""} 
          color={'neutral'}
          collection={[]}
          compact={isSm}
          proceedToPath={ '/fixpath/' }
        />
        <div className={classes.rightsSeparator} > </div>
      </div>
    ));
  };

  return (
    <div className={classes.directConsentPageContainer}>
      <h2 className={classes.header}>{overviewText}</h2>
      <div className={classes.flexContainer}>
        <div className={classes.leftContainer}>

          <p className={classes.contentText}>
          {t('authent_directconsentpage.consent_text')}
          </p>

          <br></br>

          <p className={classes.contentText}>
          {t('authent_directconsentpage.consent_buttons_top_text')}
          </p>

          <div className={classes.rightsArrayContainer}>
            { reduxRightsCollectionBarArray() }
          </div>
          
          <div className={classes.checkboxContainer}>
            <div className={classes.confirmButton}>
              <Checkbox
                color='primary'
                size='small'
                onClick={handleCheck1}
              >
                {t('authent_directconsentpage.add_consent_checkbox1')} 
              </Checkbox> 
            </div>

            <div className={classes.confirmButton}>
              <Checkbox
                color='primary'
                size='small'
                onClick={handleCheck2}
              >
                {t('authent_directconsentpage.add_consent_checkbox2')} 
              </Checkbox> 
            </div>
          </div>

          <br></br>
          <br></br>

          <div className={classes.buttonContainer}>
            <div className={classes.confirmButton}>
              <Button
                color='primary'
                size='small'
                onClick={handleConfirm}
                disabled={!checkbox1 || !checkbox2}
              >
                {t('authent_directconsentpage.add_consent_button1')} 
              </Button> 
            </div>
            <div className={classes.cancelButton}>
              <Button
                color='primary'
                variant='quiet'
                size='small'
                onClick={handleReject}
              >
                {t('authent_directconsentpage.add_consent_button2')} 
              </Button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
