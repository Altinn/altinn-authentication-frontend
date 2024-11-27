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
import { ButtonRow } from '@/components/ButtonRow';

export const RightsIncludedPageContent = () => {
  // Dette er en ny side fra "Design av 5/12" (se Repo Wiki, med senere endringer tror jeg)
  // Siden er basert på ConfirmationPage og OverviewPage så koden er ikke finpusset ennå.
  // Merk! Det er nå denne RightsIncludedPageContent som skal kjøre POST til backend
  // og ikke CreationPageContent som tidligere (men den kjører foreløpig fortsatt POST)

  const { t } = useTranslation();
  const [postNewSystemUser, { isError: isCreateSystemUserError, isLoading: isCreatingSystemUser }] =
    useCreateSystemUserMutation();

  const integrationTitle = useAppSelector((state) => state.createSystemUser.integrationTitle);
  const selectedSystemVendor = useAppSelector((state) => state.createSystemUser.selectedSystemType);
  const {
    data: rights,
    isLoading: isLoadingRights,
    isError: isLoadRightsError,
  } = useGetSystemRightsQuery(selectedSystemVendor);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useFirstRenderEffect(() => {
    // if integrationTitle or selectedSystemVendor is not set (if user goes directly to /rightsincluded url), navigate back to creation
    if (!integrationTitle || !selectedSystemVendor) {
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
      selectedSystemType: selectedSystemVendor,
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
    return <Spinner aria-label={t('authent_includedrightspage.loading_rights')} />;
  }

  return (
    <div className={classes.rightsIncludedWrapper}>
      <Heading level={2} data-size='sm'>
        {rights?.length === 1
          ? t('authent_includedrightspage.sub_title_single')
          : t('authent_includedrightspage.sub_title')}
      </Heading>
      <Paragraph data-size='sm'>
        {rights?.length === 1
          ? t('authent_includedrightspage.content_text_single')
          : t('authent_includedrightspage.content_text')}
      </Paragraph>
      <div>
        <RightsList resources={rights ?? []} />
        {isCreateSystemUserError && (
          <Alert data-color='danger' role='alert'>
            {t('authent_includedrightspage.create_systemuser_error')}
          </Alert>
        )}
        {isLoadRightsError && (
          <Alert data-color='danger' role='alert'>
            {t('authent_includedrightspage.load_rights_error')}
          </Alert>
        )}
        <ButtonRow>
          <Button
            data-size='sm'
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
          <Button variant='tertiary' data-size='sm' onClick={handleReject}>
            {t('common.cancel')}
          </Button>
        </ButtonRow>
      </div>
    </div>
  );
};
