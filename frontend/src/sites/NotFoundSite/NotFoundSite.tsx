import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';
import React from 'react';

import { Page, PageContainer } from '@/components';
import SeagullIcon from '@/assets/Seagull.svg?react';

import classes from './NotFoundSite.module.css';
import { Heading, Link, Paragraph } from '@digdir/designsystemet-react';
import { getHostUrl } from '@/utils/urlUtils';

export const NotFoundSite = () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const error: any = useRouteError();

  const { t } = useTranslation();

  return (
    <PageContainer>
      <Page>
        <div className={classes.notFoundSiteWrapper}>
          <Paragraph size='xsmall' spacing>
            {t('common.error_status_code')}: {error.status}
          </Paragraph>
          <Paragraph size='xsmall' spacing>
            {t('common.error_message')}: {error.error.message}
            {error.message}
          </Paragraph>
          <Heading level={1} size='large' spacing>
            {t('error_page.not_found_site_header')}
          </Heading>
          <div className={classes.flexContainer}>
            <div>
              <Paragraph spacing>{t('error_page.not_found_site_upper_text')}</Paragraph>
              <Paragraph spacing>
                <Link href={`https://${getHostUrl()}/ui/MessageBox`}>
                  {t('error_page.go_to_inbox')}
                </Link>
              </Paragraph>
              <Paragraph spacing>
                <Link href={`https://${getHostUrl()}/ui/Profile`}>
                  {t('error_page.go_to_profile')}
                </Link>
              </Paragraph>
              <Paragraph spacing>
                <Link href={`https://${getHostUrl()}/skjemaoversikt`}>
                  {t('error_page.find_and_submit_scheme')}
                </Link>
              </Paragraph>
              <Paragraph spacing>{t('error_page.not_found_site_lower_text')}</Paragraph>
            </div>
            <div className={classes.rightContainer}>
              <SeagullIcon />
            </div>
          </div>
        </div>
      </Page>
    </PageContainer>
  );
};
