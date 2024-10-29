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
        return 'One or more Right not found or not delegable.';
      case 'ATUI-00002':
        return 'The Delegation failed.';
      case 'ATUI-00003':
        return 'Failed to create the SystemUser.';
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
