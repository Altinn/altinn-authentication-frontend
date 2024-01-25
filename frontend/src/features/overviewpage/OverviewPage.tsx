import React, { useEffect } from 'react';
import { Page, PageHeader, PageContainer } from '@/components';
import { OverviewPageContent } from './OverviewPageContent';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { fetchOverviewPage } from '@/rtk/features/overviewPage/overviewPageSlice';
import { fetchSystemRegisterVendors } from '@/rtk/features/creationPage/creationPageSlice';
import { fetchSystemRegisterProducts } from '@/rtk/features/rightsIncludedPage/rightsIncludedPageSlice';

export const OverviewPage = () => {
  const { t } = useTranslation('common'); // Fix-me: skift til auth-språknøkkel
  const isSm = useMediaQuery('(max-width: 768px)');
  const dispatch = useAppDispatch();

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
  }, []);

  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
        icon={<ApiIcon />}
        title={t('authent_overviewpage.banner_title')}
      >
        <OverviewPageContent />
      </Page>
    </PageContainer>
  );
};
