import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page, PageContainer } from '@/components';
import ApiIcon from '@/assets/Api.svg?react';
import { VendorCreationPageContent } from './VendorCreationPageContent';

export const VendorCreationPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Page color='light' icon={<ApiIcon />} title={t('vendor_creation.banner_title')}>
        <VendorCreationPageContent />
      </Page>
    </PageContainer>
  );
};
