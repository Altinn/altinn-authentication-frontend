import { useTranslation } from 'react-i18next';
import * as React from 'react';

import { Page, PageHeader, PageContent, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';

import { DirectConsentPageContent } from './DirectConsentPageContent';

export const DirectConsentPage = () => {
  const { t } = useTranslation('common');
  const isSm = useMediaQuery('(max-width: 768px)');

  // fix-me: set language key in <PageHeader>

  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
      >
        <PageHeader icon={<ApiIcon />}>{'Direkte Samtykke'}</PageHeader>
        <PageContent>
          <DirectConsentPageContent />
        </PageContent>
      </Page>
    </PageContainer>
  );
};
