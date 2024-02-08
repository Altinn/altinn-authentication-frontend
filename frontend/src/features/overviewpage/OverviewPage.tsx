import React from 'react';
import { Page, PageContainer } from '@/components';
import { OverviewPageContent } from './OverviewPageContent';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { useTranslation } from 'react-i18next';

export const OverviewPage = () => {
  const { t } = useTranslation();
  const isSm = useMediaQuery('(max-width: 768px)');

  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
        icon={<ApiIcon />}
        title={t('authent_overviewpage.banner_title')}
      >
        <OverviewPageContent />
      </Page>
    </PageContainer>
  );
};
