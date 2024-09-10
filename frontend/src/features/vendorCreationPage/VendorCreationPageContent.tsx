import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Alert, Button, Heading, Paragraph, Spinner } from '@digdir/designsystemet-react';
import classes from './VendorCreationPageContent.module.css';
import { RightsList } from '@/components/RightsList';
import { SystemUserCreationRequest } from '@/types';
import { RightsError } from '@/components/RightsError';
import {
  useApproveSystemUserRequestMutation,
  useRejectSystemUserRequestMutation,
} from '@/rtk/features/systemUserApi';
import { AuthenticationRoute } from '@/routes/paths';
import { setCreatedId } from '@/rtk/features/createSystemUserSlice';
import { useAppDispatch } from '@/rtk/app/hooks';

interface VendorCreationPageContentProps {
  request: SystemUserCreationRequest;
  canCreateSystemUser: boolean;
}

export const VendorCreationPageContent = ({
  request,
  canCreateSystemUser,
}: VendorCreationPageContentProps) => {
  const { t } = useTranslation();

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

  return (
    <div className={classes.vendorCreationContainer}>
      <Heading level={2} size='sm'>
        {t('vendor_creation.creation_header', {
          vendorName: request.system.systemVendorOrgName,
        })}
      </Heading>
      <Paragraph>
        <Trans
          i18nKey={'vendor_creation.system_description'}
          values={{ systemName: request.system.systemName }}
        ></Trans>
      </Paragraph>
      <Paragraph>{request.system.description}</Paragraph>
      <div>
        <Heading level={3} size='xs'>
          {t('vendor_creation.rights_list_header')}
        </Heading>
        <RightsList rights={request.singleRights} />
      </div>
      <Paragraph>{t('vendor_creation.included_rights_description')}</Paragraph>
      <div>
        {!canCreateSystemUser && <RightsError />}
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
            disabled={!canCreateSystemUser || isAcceptingSystemUser || isRejectingSystemUser}
            onClick={() => acceptSystemUser()}
          >
            {isAcceptingSystemUser && (
              <Spinner size='small' title={t('vendor_creation.accept_loading')} />
            )}
            {t('vendor_creation.accept')}
          </Button>
          <Button
            variant='tertiary'
            disabled={!canCreateSystemUser || isAcceptingSystemUser || isRejectingSystemUser}
            onClick={() => rejectSystemUser()}
          >
            {isRejectingSystemUser && (
              <Spinner size='small' title={t('vendor_creation.reject_loading')} />
            )}
            {t('vendor_creation.reject')}
          </Button>
        </div>
      </div>
    </div>
  );
};
