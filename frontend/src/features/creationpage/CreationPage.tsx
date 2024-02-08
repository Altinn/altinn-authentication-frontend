import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
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
