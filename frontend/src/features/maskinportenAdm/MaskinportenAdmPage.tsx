import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { Page, PageHeader, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { MaskinportenAdmPageContent } from './MaskinportenAdmPageContent';

export const MaskinportenAdmPage = () => {
  const { t } = useTranslation('common');
  const isSm = useMediaQuery('(max-width: 768px)');

  // fix-me: set language key in <PageHeader>

  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
        icon={<ApiIcon />}
        title={'Administrere maskinporten integrasjoner'}
      >
        <MaskinportenAdmPageContent />
      </Page>
    </PageContainer>
  );
};
