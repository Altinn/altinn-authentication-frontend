import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page, PageContainer } from '@/components';
import ApiIcon from '@/assets/Api.svg?react';
import { CreationPageContent } from './CreationPageContent';

export const CreationPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Page color='dark' icon={<ApiIcon />} title={t('authent_creationpage.banner_title')}>
        <CreationPageContent />
      </Page>
    </PageContainer>
  );
};
