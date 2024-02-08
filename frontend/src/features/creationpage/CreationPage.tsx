import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { CreationPageContent } from './CreationPageContent';

export const CreationPage = () => {
  const { t } = useTranslation();
  const isSm = useMediaQuery('(max-width: 768px)');

  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
        icon={<ApiIcon />}
        title={t('authent_creationpage.banner_title')}
      >
        <CreationPageContent />
      </Page>
    </PageContainer>
  );
};
