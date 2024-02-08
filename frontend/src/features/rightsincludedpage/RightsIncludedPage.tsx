import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { RightsIncludedPageContent } from './RightsIncludedPageContent';

export const RightsIncludedPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Page color='dark' icon={<ApiIcon />} title={t('authent_includedrightspage.banner_title')}>
        <RightsIncludedPageContent />
      </Page>
    </PageContainer>
  );
};
