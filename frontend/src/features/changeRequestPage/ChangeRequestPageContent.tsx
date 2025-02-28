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
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';
import { getApiBaseUrl, getLogoutUrl } from '@/utils/urlUtils';
import { ButtonRow } from '@/components/ButtonRow';
import { DelegationCheckError } from '@/components/DelegationCheckError';
import { ProblemDetail } from '@/types/problemDetail';

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

  const [
    postAcceptChangeRequest,
    { error: acceptChangeRequestError, isLoading: isAcceptingChangeRequest },
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
    navigate(AuthenticationRoute.Overview, { state: { createdId: changeRequest.id } });
  };

  const logoutAndRedirectToVendor = (): void => {
    const url = new URL(
      `${getApiBaseUrl()}systemuser/changerequest/${changeRequest.id}/logout`,
      window.location.href,
    );
    window.location.assign(url.toString());
  };

  const logoutUser = (): void => {
    window.location.assign(getLogoutUrl());
  };

  if (isReceiptVisible) {
    return (
      <>
        <Heading level={2} data-size='sm'>
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
        <Alert data-color='info'>{t('change_request.request_accepted')}</Alert>
      )}
      {changeRequest.status === 'Rejected' && (
        <Alert data-color='info'>{t('change_request.request_rejected')}</Alert>
      )}
      {changeRequest.status === 'Timedout' && (
        <Alert data-color='info'>{t('change_request.request_expired')}</Alert>
      )}
      <Heading level={2} data-size='sm'>
        {t('change_request.change_request_header', {
          vendorName: changeRequest.system.name[currentLanguage],
        })}
      </Heading>
      <Paragraph>
        <Trans
          i18nKey={'vendor_request.system_description'}
          values={{
            systemName: changeRequest.system.name[currentLanguage],
            partyName: userInfo.representingPartyName,
          }}
        ></Trans>
      </Paragraph>
      <div />
      <div>
        <Heading level={3} data-size='xs'>
          {changeRequest.resources.length === 1
            ? t('change_request.rights_list_header_single')
            : t('change_request.rights_list_header')}
        </Heading>
        <RightsList resources={changeRequest.resources} />
      </div>
      <Paragraph>{t('vendor_request.withdraw_consent_info')}</Paragraph>
      <div>
        {!userInfo.canCreateSystemUser && <RightsError />}
        {acceptChangeRequestError && (
          <DelegationCheckError
            defaultError='change_request.accept_error'
            error={acceptChangeRequestError as { data: ProblemDetail }}
          />
        )}
        {isRejectChangeRequestError && (
          <Alert data-color='danger' role='alert'>
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
