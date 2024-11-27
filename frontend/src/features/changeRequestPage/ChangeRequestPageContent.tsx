import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Alert, Button, Heading, Paragraph } from '@digdir/designsystemet-react';
import { RightsList } from '@/components/RightsList';
import { ChangeRequest, ProfileInfo } from '@/types';
import { RightsError } from '@/components/RightsError';
import {
  useApproveChangeRequestMutation,
  useRejectChangeRequestMutation,
} from '@/rtk/features/systemUserApi';
import { AuthenticationRoute } from '@/routes/paths';
import { setCreatedId } from '@/rtk/features/createSystemUserSlice';
import { useAppDispatch } from '@/rtk/app/hooks';
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';
import { getApiBaseUrl, getLogoutUrl } from '@/utils/urlUtils';
import { ButtonRow } from '@/components/ButtonRow';

interface ChangeRequestPageContentProps {
  changeRequest: ChangeRequest;
  userInfo: ProfileInfo;
}

export const ChangeRequestPageContent = ({
  changeRequest,
  userInfo,
}: ChangeRequestPageContentProps) => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18nLanguageToShortLanguageCode(i18n.language);
  const [isReceiptVisible, setIsReceiptVisible] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [
    postAcceptChangeRequest,
    { isError: isAcceptChangeRequestError, isLoading: isAcceptingChangeRequest },
  ] = useApproveChangeRequestMutation();

  const [
    postRejectChangeRequest,
    { isError: isRejectChangeRequestError, isLoading: isRejectingChangeRequest },
  ] = useRejectChangeRequestMutation();

  const isActionButtonDisabled =
    !userInfo.canCreateSystemUser ||
    isAcceptingChangeRequest ||
    isRejectingChangeRequest ||
    changeRequest.status !== 'New';

  const acceptChangeRequest = (): void => {
    if (!isActionButtonDisabled) {
      postAcceptChangeRequest(changeRequest.id)
        .unwrap()
        .then(() => {
          if (changeRequest.redirectUrl) {
            logoutAndRedirectToVendor();
          } else {
            setIsReceiptVisible(true);
          }
        });
    }
  };

  const rejectChangeRequest = (): void => {
    if (!isActionButtonDisabled) {
      postRejectChangeRequest(changeRequest.id)
        .unwrap()
        .then(() => {
          if (changeRequest.redirectUrl) {
            logoutAndRedirectToVendor();
          } else {
            logoutUser();
          }
        });
    }
  };

  const redirectToOverview = (): void => {
    dispatch(setCreatedId(changeRequest.id));
    navigate(AuthenticationRoute.Overview);
  };

  const logoutAndRedirectToVendor = (): void => {
    const url = new URL(`${getApiBaseUrl()}systemuser/changerequest/logout`, window.location.href);
    url.searchParams.append('id', changeRequest.id);
    window.location.assign(url.toString());
  };

  const logoutUser = (): void => {
    window.location.assign(getLogoutUrl());
  };

  if (isReceiptVisible) {
    return (
      <>
        <Heading level={2} size='sm'>
          {t('vendor_request.receipt_ingress', {
            systemName: changeRequest.system.name[currentLanguage],
          })}
        </Heading>
        <Paragraph>{t('vendor_request.receipt_body')}</Paragraph>
        <ButtonRow>
          <Button variant='primary' onClick={logoutUser}>
            {t('vendor_request.receipt_close')}
          </Button>
          <Button variant='tertiary' onClick={redirectToOverview}>
            {t('vendor_request.receipt_go_to_overview')}
          </Button>
        </ButtonRow>
      </>
    );
  }

  return (
    <>
      {changeRequest.status === 'Accepted' && (
        <Alert color='info'>{t('change_request.request_accepted')}</Alert>
      )}
      {changeRequest.status === 'Rejected' && (
        <Alert color='info'>{t('change_request.request_rejected')}</Alert>
      )}
      {changeRequest.status === 'Timedout' && (
        <Alert color='info'>{t('change_request.request_expired')}</Alert>
      )}
      <Heading level={2} size='sm'>
        {t('change_request.change_request_header', {
          vendorName: changeRequest.system.name[currentLanguage],
        })}
      </Heading>
      <Paragraph spacing>
        <Trans
          i18nKey={'vendor_request.system_description'}
          values={{
            systemName: changeRequest.system.name[currentLanguage],
            partyName: userInfo.representingPartyName,
          }}
        ></Trans>
      </Paragraph>
      <div>
        <Heading level={3} size='xs'>
          {changeRequest.resourcesAfterChange.length === 1
            ? t('change_request.rights_list_header_single')
            : t('change_request.rights_list_header')}
        </Heading>
        <RightsList resources={changeRequest.resourcesAfterChange} />
      </div>
      <Paragraph>{t('vendor_request.withdraw_consent_info')}</Paragraph>
      <div>
        {!userInfo.canCreateSystemUser && <RightsError />}
        {isAcceptChangeRequestError && (
          <Alert color='danger' role='alert'>
            {t('change_request.accept_error')}
          </Alert>
        )}
        {isRejectChangeRequestError && (
          <Alert color='danger' role='alert'>
            {t('change_request.reject_error')}
          </Alert>
        )}
        <ButtonRow>
          <Button
            variant='primary'
            aria-disabled={isActionButtonDisabled}
            onClick={acceptChangeRequest}
            loading={isAcceptingChangeRequest}
          >
            {isAcceptingChangeRequest
              ? t('change_request.accept_loading')
              : t('change_request.accept')}
          </Button>
          <Button
            variant='tertiary'
            aria-disabled={isActionButtonDisabled}
            onClick={rejectChangeRequest}
            loading={isRejectingChangeRequest}
          >
            {isRejectingChangeRequest
              ? t('change_request.reject_loading')
              : t('change_request.reject')}
          </Button>
        </ButtonRow>
      </div>
    </>
  );
};
