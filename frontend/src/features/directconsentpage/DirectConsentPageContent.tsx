import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Heading } from '@digdir/design-system-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './DirectConsentPageContent.module.css';
import { ActionBar } from '@/components';
import { useCreateSystemUserMutation, useGetRightsQuery } from '@/rtk/features/systemUserApi';

export const DirectConsentPageContent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [postNewSystemUser, { isError: isCreateSystemUserError }] = useCreateSystemUserMutation();
  const { data: rights, isError: isGetRightsError } = useGetRightsQuery();

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
          {isGetRightsError && <Alert severity='danger'>Kunne ikke laste rettigheter</Alert>}
          <div>
            {rights?.map((productRight) => (
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
            <Alert severity='danger'>Kunne ikke opprette systembruker</Alert>
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
