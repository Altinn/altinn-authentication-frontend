import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Heading, Spinner } from '@digdir/designsystemet-react';
import { VendorCreationPageContent } from './VendorCreationPageContent';
import AltinnLogo from '@/assets/AltinnLogoDefault.svg?react';
import classes from './VendorCreationPageContent.module.css';
import { useGetLoggedInUserQuery } from '@/rtk/features/userApi';
import { useGetSystemUserRequestQuery } from '@/rtk/features/systemUserApi';
import { useParams } from 'react-router-dom';

export const VendorCreationPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { data: userInfo, isLoading: isLoadingUserInfo } = useGetLoggedInUserQuery();
  const {
    data: creationRequest,
    isLoading: isLoadingCreationRequest,
    isError: isLoadingCreationRequestError,
  } = useGetSystemUserRequestQuery(id ?? '');

  const userCanCreateSystemUser = userInfo?.canCreateSystemUser;

  return (
    <div className={classes.vendorCreationPage}>
      <div className={classes.vendorCreationWrapper}>
        <AltinnLogo />
        <Heading>{t('vendor_creation.banner_title')}</Heading>
        {isLoadingCreationRequestError && (
          <Alert severity='danger'>{t('vendor_creation.load_creation_request_error')}</Alert>
        )}
        {(isLoadingUserInfo || isLoadingCreationRequest) && (
          <Spinner title={t('vendor_creation.loading')} />
        )}
        {creationRequest && (
          <VendorCreationPageContent
            request={creationRequest}
            canCreateSystemUser={!!userCanCreateSystemUser}
          />
        )}
      </div>
    </div>
  );
};
