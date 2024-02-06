import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Heading } from '@digdir/design-system-react';
import { AuthenticationRoute } from '@/routes/paths';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { postNewSystemUser, CreationRequest } from '@/rtk/features/creationPage/creationPageSlice';
import classes from './DirectConsentPageContent.module.css';
import { ActionBar } from '@/components';

export const DirectConsentPageContent = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const dispatch = useAppDispatch(); // Redux for DirectConsentPage: design not ready

  const reduxObjektArray = useAppSelector(
    (state) => state.rightsIncludedPage.systemRegisterProductsArray,
  );

  // for now, return to OverviewPage: design not ready
  const handleReject = () => {
    navigate(AuthenticationRoute.Overview);
  };

  // confirm is a temporary solution, as backend and Maskinporten is not ready
  // is to dispatch a mock systemUser object and return to OverviewPage
  const handleConfirm = () => {
    const PostObjekt: CreationRequest = {
      integrationTitle: 'Direkte Tilgangsløsning',
      selectedSystemType: 'direct_consent_system : Direct Consent System',
    };
    void dispatch(postNewSystemUser(PostObjekt));
    navigate(AuthenticationRoute.Overview);
  };

  return (
    <div>
      <Heading level={2} size='small'>
        {t('authent_directconsentpage.sub_title')}
      </Heading>
      <div className={classes.flexContainer}>
        <p>{t('authent_directconsentpage.consent_text')}</p>
        <div>
          <Heading level={3} size='small'>
            {t('authent_includedrightspage.sub_title')}
          </Heading>
          <p>{t('authent_includedrightspage.content_text')}</p>
          <div>
            {reduxObjektArray.map((productRight) => (
              <ActionBar
                key={productRight.right}
                title={productRight.right}
                subtitle={`${productRight.serviceProvider}`}
                additionalText={''}
                color={'neutral'}
              />
            ))}
          </div>
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
