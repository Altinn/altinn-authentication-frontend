import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';
import React from 'react';

import { Page, PageContainer } from '@/components';
import SeagullIcon from '@/assets/Seagull.svg?react';

import classes from './NotFoundSite.module.css';
import { Link } from '@digdir/designsystemet-react';

export const NotFoundSite = () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const error: any = useRouteError();

  const { t } = useTranslation();

  return (
    <div>
      <PageContainer>
        <Page>
          <div className={classes.notFoundSiteWrapper}>
            <p className={classes.errorMessage}>
              {t('common.error_status_code')}: {error.status}
            </p>
            <p className={classes.errorMessage}>
              {t('common.error_message')}: {error.error.message}
              {error.message}
            </p>
            <h1 className={classes.header}>{t('api_delegation.not_found_site_header')}</h1>
            <div className={classes.flexContainer}>
              <div className={classes.leftContainer}>
                <p className={classes.contentText}>
                  {t('api_delegation.not_found_site_upper_text')}
                </p>

                <p className={classes.contentText}>
                  <Link href='https://www.altinn.no/ui/MessageBox'>
                    {t('api_delegation.go_to_inbox')}
                  </Link>
                </p>

                <p className={classes.contentText}>
                  <Link href='https://www.altinn.no/ui/Profile'>
                    {t('api_delegation.go_to_profile')}
                  </Link>
                </p>

                <p className={classes.contentText}>
                  <Link href='https://www.altinn.no/skjemaoversikt/'>
                    {t('api_delegation.find_and_submit_scheme')}
                  </Link>
                </p>

                <p className={classes.contentText}>
                  {t('api_delegation.not_found_site_lower_text')}
                </p>
              </div>
              <div className={classes.rightContainer}>
                <SeagullIcon />
              </div>
            </div>
          </div>
        </Page>
      </PageContainer>
    </div>
  );
};
