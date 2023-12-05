import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { Page, PageHeader, PageContent, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { CreationPageContent } from './CreationPageContent';


export const CreationPage = () => {
  const { t } = useTranslation('common');
  const isSm = useMediaQuery('(max-width: 768px)');
  
  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
      >
        <PageHeader icon={<ApiIcon />}>{t('authent_creationpage.banner_title')}</PageHeader>
        <PageContent>
          <CreationPageContent />
        </PageContent>
      </Page>
    </PageContainer>
  );
};
