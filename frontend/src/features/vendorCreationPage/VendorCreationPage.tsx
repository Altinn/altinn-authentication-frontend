import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Spinner } from '@digdir/designsystemet-react';
import { Page } from '@/components';
import ApiIcon from '@/assets/Api.svg?react';
import { VendorCreationPageContent } from './VendorCreationPageContent';
import AltinnLogo from '@/assets/AltinnTextLogo.svg?react';
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
    <div className={classes.vendorCreationWrapper}>
      <div className={classes.vendorCreationHeader}>
        <AltinnLogo />
        {creationRequest && (
          <div>
            <div>{creationRequest?.system.systemVendorOrgName}</div>
            <div>
              {t('vendor_creation.org_nr')}{' '}
              {creationRequest?.system.systemVendorOrgNumber.match(/.{1,3}/g)?.join(' ')}
            </div>
          </div>
        )}
      </div>
      <Page
        color='light'
        icon={<ApiIcon />}
        title={t('vendor_creation.banner_title')}
        smallContentPadding
      >
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
      </Page>
    </div>
  );
};
