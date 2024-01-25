import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationPath } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import {
  storeCheckbox1,
  storeCheckbox2,
} from '@/rtk/features/directConsentPage/directConsentPageSlice';
import { postNewSystemUser, CreationRequest } from '@/rtk/features/creationPage/creationPageSlice';
import { Button, Checkbox, Heading } from '@digdir/design-system-react';
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

  const overviewText = t('authent_directconsentpage.sub_title'); // h2 below, not in Small/mobile view

  // for now, return to OverviewPage: design not ready
  const handleReject = () => {
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  };

  // confirm is a temporary solution, as backend and Maskinporten is not ready
  // is to dispatch a mock systemUser object and return to OverviewPage
  const handleConfirm = () => {
    const PostObjekt: CreationRequest = {
      integrationTitle: 'Direkte Tilgangsløsning',
      selectedSystemType: 'direct_consent_system : Direct Consent System',
    };
    void dispatch(postNewSystemUser(PostObjekt));
    navigate('/' + AuthenticationPath.Auth + '/' + AuthenticationPath.Overview);
  };

  const handleCheck1 = () => {
    // Fix-me: could probably simplify in Reducer itself
    const invertedCheckbox1State: boolean = !checkbox1;
    setCheckbox1(invertedCheckbox1State); // update local state
    dispatch(storeCheckbox1({ checkbox1: invertedCheckbox1State }));
  };

  const handleCheck2 = () => {
    // Fix-me: could probably simplify in Reducer itself
    const invertedCheckbox2State: boolean = !checkbox2;
    setCheckbox2(invertedCheckbox2State); // update local state
    dispatch(storeCheckbox2({ checkbox1: invertedCheckbox2State }));
  };

  const reduxObjektArray = useAppSelector(
    (state) => state.rightsIncludedPage.systemRegisterProductsArray,
  );

  // Note: array key set to ProductRight.right, which should be unique
  // additionalText is not used yet
  // and we probably need a CollectionBar without button at right side
  const reduxRightsCollectionBarArray = () => {
    return reduxObjektArray.map((ProductRight) => (
      <div key={ProductRight.right}>
        <RightsCollectionBar
          title={ProductRight.right}
          subtitle={`${ProductRight.serviceProvider}`}
          additionalText={''}
          color={'neutral'}
          compact={isSm}
          proceedToPath={'/fixpath/'}
        />
        <div className={classes.rightsSeparator}> </div>
      </div>
    ));
  };

  /* 
            <p className={classes.contentText}>
            {t('authent_directconsentpage.consent_buttons_top_text')}
          </p>
  */

  return (
    <div>
      <Heading level={2} size='small'>
        {overviewText}
      </Heading>
      <div className={classes.flexContainer}>
        <p>{t('authent_directconsentpage.consent_text')}</p>

        <div>
          <Heading level={3} size='small'>
            {t('authent_includedrightspage.sub_title')}
          </Heading>

          <p>{t('authent_includedrightspage.content_text')}</p>

          <div>{reduxRightsCollectionBarArray()}</div>

          <div className={classes.buttonContainer}>
            <Button size='small' onClick={handleConfirm}>
              {t('authent_directconsentpage.add_consent_button1')}
            </Button>
            <Button size='small' variant='tertiary' onClick={handleReject}>
              {t('authent_directconsentpage.add_consent_button2')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
