import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Heading, Paragraph } from '@digdir/designsystemet-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './RightsIncludedPageContent.module.css';
import { ActionBar } from '@/components';
import { useCreateSystemUserMutation, useGetRightsQuery } from '@/rtk/features/systemUserApi';
import { useAppSelector } from '@/rtk/app/hooks';
import { useFirstRenderEffect } from '@/resources/hooks';

export const RightsIncludedPageContent = () => {
  // Dette er en ny side fra "Design av 5/12" (se Repo Wiki, med senere endringer tror jeg)
  // Siden er basert på ConfirmationPage og OverviewPage så koden er ikke finpusset ennå.
  // Merk! Det er nå denne RightsIncludedPageContent som skal kjøre POST til backend
  // og ikke CreationPageContent som tidligere (men den kjører foreløpig fortsatt POST)

  const { t } = useTranslation();
  const [postNewSystemUser, { isError: isCreateSystemUserError }] = useCreateSystemUserMutation();
  const { data: rights, isError: isLoadRightsError } = useGetRightsQuery();

  const integrationTitle = useAppSelector((state) => state.createSystemUser.integrationTitle);
  const selectedSystemType = useAppSelector((state) => state.createSystemUser.selectedSystemType);

  const navigate = useNavigate();

  useFirstRenderEffect(() => {
    // if integrationTitle or selectedSystemType is not set (if user goes directly to /rightsincluded url), navigate back to creation
    if (!integrationTitle || !selectedSystemType) {
      navigate(AuthenticationRoute.Creation);
    }
  });

  const navigateToOverview = (): void => {
    navigate(AuthenticationRoute.Overview);
  };

  const handleConfirm = () => {
    // POST 3 useState variables, while the last two not yet implemented
    // Update 08.01.24: agreement with Simen-backend that only two
    // key:value pairs are needed
    const postObjekt = {
      integrationTitle: integrationTitle,
      selectedSystemType: selectedSystemType,
    };

    postNewSystemUser(postObjekt).unwrap().then(navigateToOverview);
  };

  const handleReject = () => {
    navigateToOverview();
  };

  return (
    <div>
      <Heading level={2} size='small' spacing>
        {t('authent_includedrightspage.sub_title', {
          name: integrationTitle,
        })}
      </Heading>
      <Paragraph size='small' spacing>
        {t('authent_includedrightspage.content_text')}
      </Paragraph>
      <div>
        {isLoadRightsError && <Alert severity='danger'>Kunne ikke laste rettigheter</Alert>}
        {rights?.map((productRight) => (
          <ActionBar
            key={productRight.right}
            title={productRight.right}
            subtitle={`${productRight.serviceProvider}`}
            color={'neutral'}
          />
        ))}
        {isCreateSystemUserError && (
          <Alert severity='danger'>Kunne ikke opprette systembruker</Alert>
        )}
        <div className={classes.buttonContainer}>
          <Button size='small' onClick={handleConfirm}>
            {t('authent_includedrightspage.confirm_button')}
          </Button>
          <Button variant='tertiary' size='small' onClick={handleReject}>
            {t('authent_includedrightspage.cancel_button')}
          </Button>
        </div>
      </div>
    </div>
  );
};
