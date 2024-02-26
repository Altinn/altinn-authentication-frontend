import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page, PageContainer } from '@/components';
import ApiIcon from '@/assets/Api.svg?react';
import { DirectConsentPageContent } from './DirectConsentPageContent';

export const DirectConsentPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Page color='dark' icon={<ApiIcon />} title={t('authent_directconsentpage.banner_title')}>
        <DirectConsentPageContent />
      </Page>
    </PageContainer>
  );
};
