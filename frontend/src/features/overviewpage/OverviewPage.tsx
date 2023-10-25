
import * as React from 'react';
import { useEffect } from 'react';
import { Page, PageHeader, PageContent, PageContainer } from '@/components';
import { OverviewPageContent } from './OverviewPageContent';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { fetchOverviewPage } from '@/rtk/features/overviewPage/overviewPageSlice';


export const OverviewPage = () => {
  const { t } = useTranslation('common'); // Fix-me: skift til auth-språknøkkel
  const isSm = useMediaQuery('(max-width: 768px)');
  const dispatch = useAppDispatch();

  // Tester ny Redux overviewPageSlice her, med kode fra UserInfoBar.tsx
  // UserInfo er jo bare lastet inn en gang, men igjen om ikke tilstede ved re-rendering
  const overviewLoaded = useAppSelector((state) => state.overviewPage.overviewLoaded);
 
  // må finne mer elegang måte å gjøre dette på: og dynamisk: vil bare laste 1 gang tror jeg
  useEffect(() => {
    if (!overviewLoaded) {
      console.log("Prøver laste inn overviewPage data til Redux");
      void dispatch(fetchOverviewPage());
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
