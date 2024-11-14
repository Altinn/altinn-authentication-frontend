import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Spinner } from '@digdir/designsystemet-react';
import { VendorRequestPageContent } from './VendorRequestPageContent';
import { useGetLoggedInUserQuery } from '@/rtk/features/userApi';
import { useGetSystemUserRequestQuery } from '@/rtk/features/systemUserApi';
import { useSearchParams } from 'react-router-dom';
import { RequestPage } from '@/components/RequestPage';

export const VendorRequestPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('id');

  const {
    data: userInfo,
    isLoading: isLoadingUserInfo,
    isError: isLoadUserInfoError,
  } = useGetLoggedInUserQuery();

  const {
    data: creationRequest,
    isLoading: isLoadingCreationRequest,
    isError: isLoadingCreationRequestError,
  } = useGetSystemUserRequestQuery(requestId ?? '', {
    skip: !requestId,
  });

  return (
    <RequestPage
      userInfo={userInfo}
      system={creationRequest?.system}
      heading={t('vendor_request.banner_title')}
    >
      {!requestId && (
        <Alert color='danger'>{t('vendor_request.load_creation_request_no_id')}</Alert>
      )}
      {(isLoadingCreationRequestError || (creationRequest && !creationRequest.system)) && (
        <Alert color='danger'>{t('change_request.load_creation_request_error')}</Alert>
      )}
      {isLoadUserInfoError && (
        <Alert color='danger'>{t('vendor_request.load_user_info_error')}</Alert>
      )}
      {(isLoadingUserInfo || isLoadingCreationRequest) && (
        <Spinner title={t('vendor_request.loading_creation_request')} />
      )}
      {creationRequest && creationRequest.system && userInfo && (
        <VendorRequestPageContent request={creationRequest} userInfo={userInfo} />
      )}
    </RequestPage>
  );
};
