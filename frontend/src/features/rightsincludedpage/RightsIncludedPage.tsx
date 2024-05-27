import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page, PageContainer } from '@/components';
import ApiIcon from '@/assets/Api.svg?react';
import { RightsIncludedPageContent } from './RightsIncludedPageContent';
import { AuthenticationRoute } from '@/routes/paths';

export const RightsIncludedPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer backUrl={AuthenticationRoute.Creation}>
      <Page color='dark' icon={<ApiIcon />} title={t('authent_includedrightspage.banner_title')}>
        <RightsIncludedPageContent />
      </Page>
    </PageContainer>
  );
};
