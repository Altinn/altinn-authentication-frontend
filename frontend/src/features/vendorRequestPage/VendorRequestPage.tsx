import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Spinner } from '@digdir/designsystemet-react';
import { VendorRequestPageContent } from './VendorRequestPageContent';
import AltinnLogo from '@/assets/AltinnLogoDefault.svg?react';
import classes from './VendorRequestPageContent.module.css';
import { useGetLoggedInUserQuery } from '@/rtk/features/userApi';
import { useGetSystemUserRequestQuery, useGetVendorsQuery } from '@/rtk/features/systemUserApi';
import { useSearchParams } from 'react-router-dom';
import { SystemRight } from '@/types';

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

  const { data: vendors } = useGetVendorsQuery();
  const system = vendors?.find((x) => x.systemId === creationRequest?.systemId);
  const rightIds =
    creationRequest?.rights.reduce((acc: string[], curr: SystemRight) => {
      const resourceIds = curr.resource
        .filter((x) => x.id === 'urn:altinn:resource')
        .map((x) => x.value);
      return [...acc, ...resourceIds];
    }, []) ?? [];

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
        {creationRequest && userInfo && system && (
          <VendorRequestPageContent
            request={{
              ...creationRequest,
              system: { ...system, systemVendorOrgName: 'SmartCloud AS' },
              rights: system.rights.filter(
                (x) => rightIds.indexOf(x.serviceResource?.identifier) > -1,
              ),
            }}
            userInfo={userInfo}
          />
        )}
      </div>
    </div>
  );
};
