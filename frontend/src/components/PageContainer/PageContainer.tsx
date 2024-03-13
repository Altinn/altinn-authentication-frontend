import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@/assets/RedClose.svg?react';
import { getCookie } from '@/resources/Cookie/CookieMethods';
import { UserInfoBar } from '../UserInfoBar/UserInfoBar';
import classes from './PageContainer.module.css';

export interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  const { t } = useTranslation();

  const redirectToProfile = () => {
    const cleanHostname = window.location.hostname.replace('am.ui.', '');
    window.location.href = `https://${cleanHostname}/ui/Profile?R=${getCookie('AltinnPartyId')}`;
  };

  return (
    <div className={classes.pageMargin}>
      <div className={classes.pageContainer}>
        <UserInfoBar />
        <div className={classes.closeButtonContainer}>
          <button
            className={classes.closeButton}
            aria-label={String(t('common.close'))}
            onClick={redirectToProfile}
          >
            <CloseIcon className={classes.closeButtonIcon} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
