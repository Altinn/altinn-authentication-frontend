import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Heading } from '@digdir/designsystemet-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './DirectConsentPageContent.module.css';
import { ActionBar } from '@/components';
import { useCreateSystemUserMutation } from '@/rtk/features/systemUserApi';
import { SystemRight } from '@/types';

export const DirectConsentPageContent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [postNewSystemUser, { isError: isCreateSystemUserError }] = useCreateSystemUserMutation();

  // for now, return to OverviewPage: design not ready
  const handleReject = () => {
    navigate(AuthenticationRoute.Overview);
  };

  // confirm is a temporary solution, as backend and Maskinporten is not ready
  // is to dispatch a mock systemUser object and return to OverviewPage
  const handleConfirm = () => {
    const postObject = {
      integrationTitle: 'Direkte Tilgangsløsning',
      selectedSystemType: 'direct_consent_system',
      ownedByPartyId: 'test',
    };
    postNewSystemUser(postObject)
      .unwrap()
      .then(() => navigate(AuthenticationRoute.Overview));
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
            {[].map((productRight: SystemRight) => (
              <ActionBar
                key={productRight.right}
                title={productRight.right}
                subtitle={`${productRight.serviceProvider}`}
                additionalText={''}
                color={'neutral'}
              />
            ))}
          </div>
          {isCreateSystemUserError && (
            <Alert severity='danger'>
              {t('authent_includedrightspage.create_systemuser_error')}
            </Alert>
          )}
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
