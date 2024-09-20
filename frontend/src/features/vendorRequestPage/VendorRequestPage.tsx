import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Spinner } from '@digdir/designsystemet-react';
import { VendorRequestPageContent } from './VendorRequestPageContent';
import AltinnLogo from '@/assets/AltinnLogoDefault.svg?react';
import classes from './VendorRequestPageContent.module.css';
import { useGetLoggedInUserQuery } from '@/rtk/features/userApi';
import { useGetSystemUserRequestQuery } from '@/rtk/features/systemUserApi';
import { useSearchParams } from 'react-router-dom';

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
          <Alert severity='danger'>{t('vendor_request.load_creation_request_no_id')}</Alert>
        )}
        {isLoadingCreationRequestError && (
          <Alert severity='danger'>{t('vendor_request.load_creation_request_error')}</Alert>
        )}
        {isLoadUserInfoError && (
          <Alert severity='danger'>{t('vendor_request.load_user_info_error')}</Alert>
        )}
        {(isLoadingUserInfo || isLoadingCreationRequest) && (
          <Spinner title={t('vendor_request.loading')} />
        )}
        {creationRequest && userInfo && (
          <VendorRequestPageContent request={creationRequest} userInfo={userInfo} />
        )}
      </div>
    </div>
  );
};
