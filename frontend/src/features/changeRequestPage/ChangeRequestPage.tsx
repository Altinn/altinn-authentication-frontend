import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Spinner } from '@digdir/designsystemet-react';
import { useGetLoggedInUserQuery } from '@/rtk/features/userApi';
import { useGetChangeRequestQuery } from '@/rtk/features/systemUserApi';
import { useSearchParams } from 'react-router-dom';
import { RequestPage } from '@/components/RequestPage';
import { ChangeRequestPageContent } from './ChangeRequestPageContent';

export const ChangeRequestPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const changeRequestId = searchParams.get('id');

  const {
    data: userInfo,
    isLoading: isLoadingUserInfo,
    isError: isLoadUserInfoError,
  } = useGetLoggedInUserQuery();

  const {
    data: changeRequest,
    isLoading: isLoadingChangeRequest,
    isError: isLoadingChangeRequestError,
  } = useGetChangeRequestQuery(changeRequestId ?? '', {
    skip: !changeRequestId,
  });

  return (
    <RequestPage
      userInfo={userInfo}
      system={changeRequest?.system}
      heading={t('change_request.banner_title')}
    >
      {!changeRequestId && (
        <Alert data-color='danger'>{t('vendor_request.load_creation_request_no_id')}</Alert>
      )}
      {(isLoadingChangeRequestError || (changeRequest && !changeRequest.system)) && (
        <Alert data-color='danger'>{t('change_request.load_change_request_error')}</Alert>
      )}
      {isLoadUserInfoError && (
        <Alert data-color='danger'>{t('change_request.load_user_info_error')}</Alert>
      )}
      {(isLoadingUserInfo || isLoadingChangeRequest) && (
        <Spinner aria-label={t('change_request.loading_change_request')} />
      )}
      {changeRequest && changeRequest.system && userInfo && (
        <ChangeRequestPageContent changeRequest={changeRequest} userInfo={userInfo} />
      )}
    </RequestPage>
  );
};
