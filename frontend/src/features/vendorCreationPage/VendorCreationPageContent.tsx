import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Alert, Button, Heading, Paragraph, Spinner } from '@digdir/designsystemet-react';
import classes from './VendorCreationPageContent.module.css';
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

interface VendorCreationPageContentProps {
  request: SystemUserCreationRequest;
  userInfo: ProfileInfo;
}

export const VendorCreationPageContent = ({
  request,
  userInfo,
}: VendorCreationPageContentProps) => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18nLanguageToShortLanguageCode(i18n.language);

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

  const acceptSystemUser = () => {
    postAcceptCreationRequest(request.requestId)
      .unwrap()
      .then(() => redirectAfterAction(request.requestId));
  };

  const rejectSystemUser = () => {
    postRejectCreationRequest(request.requestId)
      .unwrap()
      .then(() => redirectAfterAction());
  };

  const redirectAfterAction = (createdId?: string) => {
    if (request.redirectUrl) {
      // logout and redirect
      window.location.assign(request.redirectUrl);
    } else {
      // redirect to overview page
      if (createdId) {
        dispatch(setCreatedId(createdId));
      }
      navigate(AuthenticationRoute.Overview);
    }
  };

  const isActionButtonDisabled =
    !userInfo.canCreateSystemUser || isAcceptingSystemUser || isRejectingSystemUser;

  return (
    <>
      <div className={classes.vendorCreationBlock}>
        <Heading level={1} size='lg'>
          {t('vendor_creation.banner_title')}
        </Heading>
      </div>
      <div className={classes.vendorCreationBlock}>
        <Heading level={2} size='sm'>
          {t('vendor_creation.creation_header', {
            vendorName: request.system.systemName[currentLanguage],
          })}
        </Heading>
        <Paragraph spacing>
          <Trans
            i18nKey={'vendor_creation.system_description'}
            values={{
              systemName: request.system.systemName[currentLanguage],
              partyName: userInfo.representingPartyName,
            }}
          ></Trans>
        </Paragraph>
        <div>
          <Heading level={3} size='xs'>
            {request.singleRights.length === 1
              ? t('vendor_creation.rights_list_header_single')
              : t('vendor_creation.rights_list_header')}
          </Heading>
          <RightsList rights={request.singleRights} />
        </div>
        <Paragraph>{t('vendor_creation.withdraw_consent_info')}</Paragraph>
        <div>
          {!userInfo.canCreateSystemUser && <RightsError />}
          {isAcceptCreationRequestError && (
            <Alert severity='danger' role='alert'>
              {t('vendor_creation.accept_error')}
            </Alert>
          )}
          {isRejectCreationRequestError && (
            <Alert severity='danger' role='alert'>
              {t('vendor_creation.reject_error')}
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
            >
              {isAcceptingSystemUser && (
                <Spinner size='small' title={t('vendor_creation.accept_loading')} />
              )}
              {t('vendor_creation.accept')}
            </Button>
            <Button
              variant='tertiary'
              aria-disabled={isActionButtonDisabled}
              onClick={() => {
                if (!isActionButtonDisabled) {
                  rejectSystemUser();
                }
              }}
            >
              {isRejectingSystemUser && (
                <Spinner size='small' title={t('vendor_creation.reject_loading')} />
              )}
              {t('vendor_creation.reject')}
            </Button>
          </div>
        </div>
      </div>
      <Paragraph size='sm' className={classes.vendorInfo}>
        {t('vendor_creation.org_nr', {
          systemName: request.system.systemName[currentLanguage],
          vendorName: request.system.systemVendorOrgName,
          vendorOrg: request.system.systemVendorOrgNumber.match(/.{1,3}/g)?.join(' '),
        })}
      </Paragraph>
    </>
  );
};
