
import * as React from 'react';
import { useEffect } from 'react';
import { Page, PageHeader, PageContent, PageContainer } from '@/components';
import { OverviewPageContent } from './OverviewPageContent';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { fetchOverviewPage } from '@/rtk/features/overviewPage/overviewPageSlice';
import { fetchSystemRegisterVendors } from '@/rtk/features/creationPage/creationPageSlice'; 


export const OverviewPage = () => {
  const { t } = useTranslation('common'); // Fix-me: skift til auth-språknøkkel
  const isSm = useMediaQuery('(max-width: 768px)');
  const dispatch = useAppDispatch();

  // Tester ny Redux overviewPageSlice her, med kode fra UserInfoBar.tsx
  // UserInfo er jo bare lastet inn en gang, men igjen om ikke tilstede ved re-rendering
  const overviewLoaded = useAppSelector((state) => state.overviewPage.overviewLoaded);
 
  // Fix-me: laster inn data bare en gang ved første render
  // må finne mer elegang måte å gjøre dette på: og dynamisk: vil bare laste 1 gang tror jeg
  useEffect(() => {
    if (!overviewLoaded) {
      console.log("Førstegangs innlasting av OverviewPage og CreationPage data til Redux");
      void dispatch(fetchOverviewPage());
      void dispatch(fetchSystemRegisterVendors()); // for CreationPage: see issue #94
    }
  }, []);

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
