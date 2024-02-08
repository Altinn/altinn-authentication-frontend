import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { ConfirmationPageContent } from './ConfirmationPageContent';

export const ConfirmationPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Page color='dark' icon={<ApiIcon />} title={t('authent_confirmationpage.banner_title')}>
        <ConfirmationPageContent />
      </Page>
    </PageContainer>
  );
};
