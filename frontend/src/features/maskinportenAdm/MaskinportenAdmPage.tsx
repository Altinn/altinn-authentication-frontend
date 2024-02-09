import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
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
