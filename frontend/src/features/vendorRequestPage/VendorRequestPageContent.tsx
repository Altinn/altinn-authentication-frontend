import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Alert, Button, Heading, Paragraph } from '@digdir/designsystemet-react';
import classes from './VendorRequestPageContent.module.css';
import { RightsList } from '@/components/RightsList';
import { ProfileInfo, SystemUserCreationRequest } from '@/types';
import { RightsError } from '@/components/RightsError';
import {
  useApproveSystemUserRequestMutation,
  useRejectSystemUserRequestMutation,
} from '@/rtk/features/systemUserApi';
import { AuthenticationRoute } from '@/routes/paths';
import { setCreatedId } from '@/rtk/features/createSystemUserSlice';
import { useAppDispatch } from '@/rtk/app/hooks';
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';
import { getLogoutUrl } from '@/utils/urlUtils';

interface VendorRequestPageContentProps {
  request: SystemUserCreationRequest;
  userInfo: ProfileInfo;
}

export const VendorRequestPageContent = ({ request, userInfo }: VendorRequestPageContentProps) => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18nLanguageToShortLanguageCode(i18n.language);
  const [isReceiptVisible, setIsReceiptVisible] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [
    postAcceptCreationRequest,
    { isError: isAcceptCreationRequestError, isLoading: isAcceptingSystemUser },
  ] = useApproveSystemUserRequestMutation();

  const [
    postRejectCreationRequest,
    { isError: isRejectCreationRequestError, isLoading: isRejectingSystemUser },
  ] = useRejectSystemUserRequestMutation();

  const isActionButtonDisabled =
    !userInfo.canCreateSystemUser ||
    isAcceptingSystemUser ||
    isRejectingSystemUser ||
    request.status !== 'New';

  const acceptSystemUser = (): void => {
    if (!isActionButtonDisabled) {
      postAcceptCreationRequest(request.id)
        .unwrap()
        .then(() => {
          if (request.redirectUrl) {
            logoutAndRedirectToVendor();
          } else {
            setIsReceiptVisible(true);
          }
        });
    }
  };

  const rejectSystemUser = (): void => {
    if (!isActionButtonDisabled) {
      postRejectCreationRequest(request.id)
        .unwrap()
        .then(() => {
          if (request.redirectUrl) {
            logoutAndRedirectToVendor();
          } else {
            logoutUser();
          }
        });
    }
  };

  const logoutAndRedirectToVendor = (): void => {
    const url = new URL('/authfront/api/v1/systemuser/request/logout', window.location.href);
    url.searchParams.append('id', request.id);
    window.location.assign(url.toString());
  };

  const logoutUser = (): void => {
    window.location.assign(getLogoutUrl());
  };

  const redirectToOverview = (): void => {
    dispatch(setCreatedId(request.id));
    navigate(AuthenticationRoute.Overview);
  };

  if (isReceiptVisible) {
    return (
      <>
        <Heading level={2} size='sm'>
          {t('vendor_request.receipt_ingress', {
            systemName: request.system.name[currentLanguage],
          })}
        </Heading>
        <Paragraph>{t('vendor_request.receipt_body')}</Paragraph>
        <div className={classes.buttonRow}>
          <Button variant='primary' onClick={logoutUser}>
            {t('vendor_request.receipt_close')}
          </Button>
          <Button variant='tertiary' onClick={redirectToOverview}>
            {t('vendor_request.receipt_go_to_overview')}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      {request.status === 'Accepted' && (
        <Alert color='info'>{t('vendor_request.request_accepted')}</Alert>
      )}
      {request.status === 'Rejected' && (
        <Alert color='info'>{t('vendor_request.request_rejected')}</Alert>
      )}
      {request.status === 'Timedout' && (
        <Alert color='info'>{t('vendor_request.request_expired')}</Alert>
      )}
      <Heading level={2} size='sm'>
        {t('vendor_request.creation_header', {
          vendorName: request.system.name[currentLanguage],
        })}
      </Heading>
      <Paragraph spacing>
        <Trans
          i18nKey={'vendor_request.system_description'}
          values={{
            systemName: request.system.name[currentLanguage],
            partyName: userInfo.representingPartyName,
          }}
        ></Trans>
      </Paragraph>
      <div>
        <Heading level={3} size='xs'>
          {request.resources.length === 1
            ? t('vendor_request.rights_list_header_single')
            : t('vendor_request.rights_list_header')}
        </Heading>
        <RightsList resources={request.resources} />
      </div>
      <Paragraph>{t('vendor_request.withdraw_consent_info')}</Paragraph>
      <div>
        {!userInfo.canCreateSystemUser && <RightsError />}
        {isAcceptCreationRequestError && (
          <Alert color='danger' role='alert'>
            {t('vendor_request.accept_error')}
          </Alert>
        )}
        {isRejectCreationRequestError && (
          <Alert color='danger' role='alert'>
            {t('vendor_request.reject_error')}
          </Alert>
        )}
        <div className={classes.buttonRow}>
          <Button
            variant='primary'
            aria-disabled={isActionButtonDisabled}
            onClick={acceptSystemUser}
            loading={isAcceptingSystemUser}
          >
            {isAcceptingSystemUser
              ? t('vendor_request.accept_loading')
              : t('vendor_request.accept')}
          </Button>
          <Button
            variant='tertiary'
            aria-disabled={isActionButtonDisabled}
            onClick={rejectSystemUser}
            loading={isRejectingSystemUser}
          >
            {isRejectingSystemUser
              ? t('vendor_request.reject_loading')
              : t('vendor_request.reject')}
          </Button>
        </div>
      </div>
    </>
  );
};
