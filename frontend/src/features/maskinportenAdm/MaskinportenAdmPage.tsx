import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page, PageContainer } from '@/components';
import ApiIcon from '@/assets/Api.svg?react';
import { MaskinportenAdmPageContent } from './MaskinportenAdmPageContent';

export const MaskinportenAdmPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Page color='dark' icon={<ApiIcon />} title={t('authent_maskinporten.banner_title')}>
        <MaskinportenAdmPageContent />
      </Page>
    </PageContainer>
  );
};
