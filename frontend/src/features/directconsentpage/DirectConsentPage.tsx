import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { Page, PageHeader, PageContainer } from '@/components';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { DirectConsentPageContent } from './DirectConsentPageContent';

import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { fetchOverviewPage } from '@/rtk/features/overviewPage/overviewPageSlice';
import { fetchSystemRegisterVendors } from '@/rtk/features/creationPage/creationPageSlice';
import { fetchSystemRegisterProducts } from '@/rtk/features/rightsIncludedPage/rightsIncludedPageSlice';

export const DirectConsentPage = () => {
  const { t } = useTranslation('common');
  const isSm = useMediaQuery('(max-width: 768px)');
  const dispatch = useAppDispatch();

  // Transfer code from OverviewPage due to Redux reboot upon
  // navigation to DirectConsentPage: Fix-me: dotnet app disturb?

  const overviewLoaded = useAppSelector((state) => state.overviewPage.overviewLoaded);

  // Fix-me: laster inn data bare en gang ved første render
  // må finne mer elegant måte å gjøre dette på: og dynamisk: vil bare laste 1 gang
  useEffect(() => {
    if (!overviewLoaded) {
      console.log('Førstegangs innlasting av OverviewPage og CreationPage data til Redux');
      void dispatch(fetchOverviewPage());
      void dispatch(fetchSystemRegisterVendors()); // for CreationPage
      void dispatch(fetchSystemRegisterProducts()); // for RightsIncludedPage
    }
  }, [dispatch, overviewLoaded]);

  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
        icon={<ApiIcon />}
        title={t('authent_directconsentpage.banner_title')}
      >
        <DirectConsentPageContent />
      </Page>
    </PageContainer>
  );
};
