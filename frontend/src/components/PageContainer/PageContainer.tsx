import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@digdir/designsystemet-react';
import CloseIcon from '@/assets/RedClose.svg?react';
import { getCookie } from '@/resources/Cookie/CookieMethods';
import { UserInfoBar } from '../UserInfoBar';
import classes from './PageContainer.module.css';
import { getHostUrl } from '@/utils/urlUtils';

export interface PageContainerProps {
  backUrl?: string;
  children: React.ReactNode;
}

export const PageContainer = ({ backUrl, children }: PageContainerProps) => {
  const { t } = useTranslation();

  const profileUrl = `https://${getHostUrl()}/ui/Profile?R=${getCookie('AltinnPartyId')}`;

  return (
    <div className={classes.pageMargin}>
      <div className={classes.pageContainer}>
        <UserInfoBar />
        <div className={classes.buttonContainer}>
          {backUrl && (
            <Button
              icon={true}
              title={t('common.back')}
              variant='tertiary'
              className={classes.buttonContainerButton}
              data-size='sm'
              asChild
            >
              <RouterLink to={backUrl}>
                <ArrowLeftIcon className={classes.buttonContainerIcon} />
              </RouterLink>
            </Button>
          )}
          <Button
            icon={true}
            title={t('common.close')}
            className={classes.buttonContainerButton}
            data-size='sm'
            asChild
          >
            <a href={profileUrl}>
              <CloseIcon className={classes.buttonContainerIcon} />
            </a>
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
