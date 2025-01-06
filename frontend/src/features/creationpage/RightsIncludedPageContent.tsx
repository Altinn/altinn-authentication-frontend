import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Spinner } from '@digdir/designsystemet-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './CreationPageContent.module.css';
import { useCreateSystemUserMutation, useGetSystemRightsQuery } from '@/rtk/features/systemUserApi';
import { RightsList } from '@/components/RightsList';
import { ButtonRow } from '@/components/ButtonRow';
import { DelegationCheckError } from '@/components/DelegationCheckError';
import { ProblemDetail } from '@/types/problemDetail';
import { PageDescription } from '@/components/PageDescription';

interface RightsIncludedPageContentProps {
  selectedSystemId: string;
  integrationTitle: string;
}

export const RightsIncludedPageContent = ({
  selectedSystemId,
  integrationTitle,
}: RightsIncludedPageContentProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [postNewSystemUser, { error: createSystemUserError, isLoading: isCreatingSystemUser }] =
    useCreateSystemUserMutation();

  const {
    data: rights,
    isLoading: isLoadingRights,
    isError: isLoadRightsError,
  } = useGetSystemRightsQuery(selectedSystemId);

  const handleConfirm = () => {
    const postObjekt = {
      integrationTitle: integrationTitle,
      systemId: selectedSystemId,
    };

    postNewSystemUser(postObjekt)
      .unwrap()
      .then((payload) => {
        navigate(AuthenticationRoute.Overview, { state: { createdId: payload.id } });
      });
  };

  const handleReject = () => {
    navigate(AuthenticationRoute.Overview);
  };

  if (isLoadingRights) {
    return <Spinner aria-label={t('authent_includedrightspage.loading_rights')} />;
  }

  return (
    <div>
      <PageDescription
        heading={
          rights?.length === 1
            ? t('authent_includedrightspage.sub_title_single')
            : t('authent_includedrightspage.sub_title')
        }
        ingress={
          rights?.length === 1
            ? t('authent_includedrightspage.content_text_single')
            : t('authent_includedrightspage.content_text')
        }
      />
      <div>
        <RightsList resources={rights ?? []} />
        {createSystemUserError && (
          <DelegationCheckError
            defaultError='authent_includedrightspage.create_systemuser_error'
            error={createSystemUserError as { data: ProblemDetail }}
          />
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
