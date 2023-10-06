import { useTranslation } from 'react-i18next';
import * as React from 'react';

import { Page, PageHeader, PageContent, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';

import { MaskinportenIntAdmPageContent } from './MaskinportenIntAdmPageContent';


export const MaskinportenIntAdmPage = () => {
  const { t } = useTranslation('common');
  const isSm = useMediaQuery('(max-width: 768px)');

  // fix-me: set language key in <PageHeader>

  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
      >
        <PageHeader icon={<ApiIcon />}>{'Administrere maskinporten integrasjoner'}</PageHeader>
        <PageContent>
          <MaskinportenIntAdmPageContent />
        </PageContent>
      </Page>
    </PageContainer>
  );
};
