import React from 'react';
import { Page, PageContainer } from '@/components';
import { OverviewPageContent } from './OverviewPageContent';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useTranslation } from 'react-i18next';

export const OverviewPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Page color='dark' icon={<ApiIcon />} title={t('authent_overviewpage.banner_title')}>
        <OverviewPageContent />
      </Page>
    </PageContainer>
  );
};
