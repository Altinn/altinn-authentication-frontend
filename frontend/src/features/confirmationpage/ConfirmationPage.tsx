import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { ConfirmationPageContent } from './ConfirmationPageContent';

export const ConfirmationPage = () => {
  const { t } = useTranslation();
  const isSm = useMediaQuery('(max-width: 768px)');

  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
        icon={<ApiIcon />}
        title={t('authent_confirmationpage.banner_title')}
      >
        <ConfirmationPageContent />
      </Page>
    </PageContainer>
  );
};
