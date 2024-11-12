import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Alert, Button, Heading, Paragraph } from '@digdir/designsystemet-react';
import classes from './ChangeRequestPageContent.module.css';
import { RightsList } from '@/components/RightsList';
import { ChangeRequest, ProfileInfo } from '@/types';
import { RightsError } from '@/components/RightsError';
import {
  useApproveSystemUserRequestMutation,
  useRejectSystemUserRequestMutation,
} from '@/rtk/features/systemUserApi';
import { AuthenticationRoute } from '@/routes/paths';
import { setCreatedId } from '@/rtk/features/createSystemUserSlice';
import { useAppDispatch } from '@/rtk/app/hooks';
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';

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
    postAcceptCreationRequest,
    { isError: isAcceptCreationRequestError, isLoading: isAcceptingSystemUser },
  ] = useApproveSystemUserRequestMutation();

  const [
    postRejectCreationRequest,
    { isError: isRejectCreationRequestError, isLoading: isRejectingSystemUser },
  ] = useRejectSystemUserRequestMutation();

  const acceptSystemUser = (): void => {
    postAcceptCreationRequest(changeRequest.id)
      .unwrap()
      .then(() => {
        if (changeRequest.redirectUrl) {
          redirectToVendor(changeRequest.redirectUrl);
        } else {
          setIsReceiptVisible(true);
        }
      });
  };

  const rejectSystemUser = (): void => {
    postRejectCreationRequest(changeRequest.id)
      .unwrap()
      .then(() => {
        if (changeRequest.redirectUrl) {
          redirectToVendor(changeRequest.redirectUrl);
        } else {
          logoutUser();
        }
      });
  };

  const redirectToVendor = (requestUrl: string): void => {
    const url = new URL(requestUrl);
    url.searchParams.append('id', changeRequest.id);
    window.location.assign(url.toString());
  };

  const logoutUser = (): void => {
    window.location.assign('/ui/Authentication/Logout');
  };

  const isActionButtonDisabled =
    !userInfo.canCreateSystemUser ||
    isAcceptingSystemUser ||
    isRejectingSystemUser ||
    changeRequest.status !== 'New';

  if (isReceiptVisible) {
    return (
      <>
        <Heading level={2} size='sm'>
          {t('vendor_request.receipt_ingress', {
            systemName: changeRequest.system.name[currentLanguage],
          })}
        </Heading>
        <Paragraph>{t('vendor_request.receipt_body')}</Paragraph>
        <div className={classes.buttonRow}>
          <Button variant='primary' onClick={() => logoutUser()}>
            {t('vendor_request.receipt_close')}
          </Button>
          <Button
            variant='tertiary'
            onClick={() => {
              dispatch(setCreatedId(changeRequest.id));
              navigate(AuthenticationRoute.Overview);
            }}
          >
            {t('vendor_request.receipt_go_to_overview')}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      {changeRequest.status === 'Accepted' && (
        <Alert color='info'>{t('vendor_request.request_accepted')}</Alert>
      )}
      {changeRequest.status === 'Rejected' && (
        <Alert color='info'>{t('vendor_request.request_rejected')}</Alert>
      )}
      {changeRequest.status === 'Timedout' && (
        <Alert color='info'>{t('vendor_request.request_expired')}</Alert>
      )}
      <Heading level={2} size='sm'>
        {t('vendor_request.creation_header', {
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
          Disse rettighetene legges til
        </Heading>
        <RightsList resources={changeRequest.requiredResources} />
      </div>
      <div>
        <Heading level={3} size='xs'>
          Disse rettighetene fjernes
        </Heading>
        <RightsList resources={changeRequest.unwantedResources} />
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
            onClick={() => {
              if (!isActionButtonDisabled) {
                acceptSystemUser();
              }
            }}
            loading={isAcceptingSystemUser}
          >
            {isAcceptingSystemUser
              ? t('vendor_request.accept_loading')
              : t('vendor_request.accept')}
          </Button>
          <Button
            variant='tertiary'
            aria-disabled={isActionButtonDisabled}
            onClick={() => {
              if (!isActionButtonDisabled) {
                rejectSystemUser();
              }
            }}
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
