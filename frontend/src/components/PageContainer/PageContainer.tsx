import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button, Link, Tooltip } from '@digdir/designsystemet-react';
import CloseIcon from '@/assets/RedClose.svg?react';
import { getCookie } from '@/resources/Cookie/CookieMethods';
import { UserInfoBar } from '../UserInfoBar/UserInfoBar';
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
            <Tooltip content={t('common.back')}>
              <Button
                icon={true}
                color='second'
                variant='tertiary'
                className={classes.buttonContainerButton}
                size='small'
                asChild
              >
                <RouterLink to={backUrl}>
                  <ArrowLeftIcon className={classes.buttonContainerIcon} />
                </RouterLink>
              </Button>
            </Tooltip>
          )}
          <Tooltip content={t('common.close')}>
            <Button icon={true} className={classes.buttonContainerButton} size='small' asChild>
              <Link href={profileUrl}>
                <CloseIcon className={classes.buttonContainerIcon} />
              </Link>
            </Button>
          </Tooltip>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
