import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Heading, Paragraph, Spinner } from '@digdir/designsystemet-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './RightsIncludedPageContent.module.css';
import { useCreateSystemUserMutation, useGetSystemRightsQuery } from '@/rtk/features/systemUserApi';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { useFirstRenderEffect } from '@/resources/hooks';
import { setCreatedId } from '@/rtk/features/createSystemUserSlice';
import { RightsList } from '@/components/RightsList';
import { DelegationCheckError } from '@/components/DelegationCheckError';
import { ProblemDetail } from '@/types/problemDetail';

export const RightsIncludedPageContent = () => {
  // Dette er en ny side fra "Design av 5/12" (se Repo Wiki, med senere endringer tror jeg)
  // Siden er basert på ConfirmationPage og OverviewPage så koden er ikke finpusset ennå.
  // Merk! Det er nå denne RightsIncludedPageContent som skal kjøre POST til backend
  // og ikke CreationPageContent som tidligere (men den kjører foreløpig fortsatt POST)

  const { t } = useTranslation();
  const [postNewSystemUser, { error: createSystemUserError, isLoading: isCreatingSystemUser }] =
    useCreateSystemUserMutation();

  const integrationTitle = useAppSelector((state) => state.createSystemUser.integrationTitle);
  const selectedSystemId = useAppSelector((state) => state.createSystemUser.selectedSystemId);
  const {
    data: rights,
    isLoading: isLoadingRights,
    isError: isLoadRightsError,
  } = useGetSystemRightsQuery(selectedSystemId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useFirstRenderEffect(() => {
    // if integrationTitle or selectedSystemVendor is not set (if user goes directly to /rightsincluded url), navigate back to creation
    if (!integrationTitle || !selectedSystemId) {
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
      systemId: selectedSystemId,
    };

    postNewSystemUser(postObjekt)
      .unwrap()
      .then((payload) => {
        dispatch(setCreatedId(payload.id));
        navigateToOverview();
      });
  };

  const handleReject = () => {
    navigateToOverview();
  };

  if (isLoadingRights) {
    return <Spinner title={t('authent_includedrightspage.loading_rights')} />;
  }

  return (
    <div>
      <Heading level={2} size='sm' spacing>
        {rights?.length === 1
          ? t('authent_includedrightspage.sub_title_single')
          : t('authent_includedrightspage.sub_title')}
      </Heading>
      <Paragraph size='sm' spacing>
        {rights?.length === 1
          ? t('authent_includedrightspage.content_text_single')
          : t('authent_includedrightspage.content_text')}
      </Paragraph>
      <div>
        <RightsList resources={rights ?? []} />
        {createSystemUserError && (
          <DelegationCheckError error={createSystemUserError as { data: ProblemDetail }} />
        )}
        {isLoadRightsError && (
          <Alert color='danger' role='alert'>
            {t('authent_includedrightspage.load_rights_error')}
          </Alert>
        )}
        <div className={classes.buttonContainer}>
          <Button
            size='sm'
            variant='primary'
            onClick={handleConfirm}
            disabled={isCreatingSystemUser || isLoadRightsError}
            className={classes.successButton}
            loading={isCreatingSystemUser}
          >
            {isCreatingSystemUser
              ? t('authent_includedrightspage.creating_systemuser')
              : t('authent_includedrightspage.confirm_button')}
          </Button>
          <Button variant='tertiary' size='sm' onClick={handleReject}>
            {t('common.cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
};
