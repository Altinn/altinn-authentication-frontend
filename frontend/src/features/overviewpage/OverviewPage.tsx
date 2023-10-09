import { useTranslation } from 'react-i18next';
import * as React from 'react';

import { Page, PageHeader, PageContent, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';

import { OverviewPageContent } from './OverviewPageContent';

export const OverviewPage = () => {
  const { t } = useTranslation('common'); // Fix-me: skift til auth-språknøkkel
  const isSm = useMediaQuery('(max-width: 768px)');

  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
      >
        <PageHeader icon={<ApiIcon />}>{t('api_delegation.api_delegations')}</PageHeader>
        <PageContent>
          <OverviewPageContent />
        </PageContent>
      </Page>
    </PageContainer>
  );
};
