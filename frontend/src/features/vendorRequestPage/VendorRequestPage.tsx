import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Spinner } from '@digdir/designsystemet-react';
import { VendorRequestPageContent } from './VendorRequestPageContent';
import AltinnLogo from '@/assets/AltinnLogoDefault.svg?react';
import classes from './VendorRequestPageContent.module.css';
import { useGetLoggedInUserQuery } from '@/rtk/features/userApi';
import { useGetSystemUserRequestQuery } from '@/rtk/features/systemUserApi';
import { useSearchParams } from 'react-router-dom';
import { ProblemDetail } from '@/types/problemDetail';

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
    error: loadingCreationRequestError,
  } = useGetSystemUserRequestQuery(requestId ?? '', {
    skip: !requestId,
  });

  return (
    <div className={classes.vendorRequestPage}>
      <div className={classes.vendorRequestWrapper}>
        <div className={classes.headerContainer}>
          <AltinnLogo />
          {userInfo && (
            <div>
              <div>{userInfo?.loggedInPersonName}</div>
              <div>for {userInfo?.representingPartyName}</div>
            </div>
          )}
        </div>
        {!requestId && (
          <Alert data-color='danger'>{t('vendor_request.load_creation_request_no_id')}</Alert>
        )}
        {(loadingCreationRequestError || (creationRequest && !creationRequest.system)) && (
          <Alert data-color='danger'>
            {(loadingCreationRequestError as { data: ProblemDetail }).data.status === 404
              ? t('vendor_request.load_creation_request_error_notfound')
              : t('vendor_request.load_creation_request_error')}
          </Alert>
        )}
        {isLoadUserInfoError && (
          <Alert data-color='danger'>{t('vendor_request.load_user_info_error')}</Alert>
        )}
        {(isLoadingUserInfo || isLoadingCreationRequest) && (
          <Spinner aria-label={t('vendor_request.loading')} />
        )}
        {creationRequest && creationRequest.system && userInfo && (
          <VendorRequestPageContent request={creationRequest} userInfo={userInfo} />
        )}
      </div>
    </div>
  );
};
