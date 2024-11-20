import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from '@digdir/designsystemet-react';
import { ProblemDetail } from '@/types/problemDetail';
import classes from './DelegationCheckError.module.css';

interface DelegationCheckErrorProps {
  error: {
    data: ProblemDetail;
  };
}

export const DelegationCheckError = ({ error }: DelegationCheckErrorProps): React.ReactNode => {
  const { t } = useTranslation();

  const getErrorMessage = (): string => {
    switch (error?.data?.code) {
      case 'ATUI-00001':
        return t('delegation_errors.01_rights_not_found_or_not_delegable');
      case 'ATUI-00002':
        return t('delegation_errors.02_rights_failed_to_delegate');
      case 'ATUI-00003':
        return t('delegation_errors.03_systemuser_failed_to_create');
      case 'ATUI-00004':
        return t('delegation_errors.04_system_user_already_exists');
      case 'ATUI-00014':
        return t('delegation_errors.14_unable_to_do_delegation_check');
      case 'ATUI-00015':
        return t('delegation_errors.15_delegation_right_missing_role_access');
      case 'ATUI-00016':
        return t('delegation_errors.16_delegation_right_missing_delegation_access');
      case 'ATUI-00017':
        return t('delegation_errors.17_delegation_right_missing_srr_right_access');
      case 'ATUI-00018':
        return t('delegation_errors.18_delegation_right_insufficient_authentication_level');
      default:
        return t('authent_includedrightspage.create_systemuser_error');
    }
  };

  return (
    <div className={classes.delegationCheckError}>
      <Alert color='danger'>{getErrorMessage()}</Alert>
    </div>
  );
};
