import { Page, PageContainer } from '@/components';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { fetchOverviewPage } from '@/rtk/features/overviewPage/overviewPageSlice';
import React, { useEffect, useState } from 'react';
import { DetailPageContent } from './DetailPageContent';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { useParams } from 'react-router-dom';
import { fetchSystemRegisterProducts } from '@/rtk/features/rightsIncludedPage/rightsIncludedPageSlice';

export const DetailPage = (): React.ReactNode => {
  const dispatch = useAppDispatch();
  const isSm = useMediaQuery('(max-width: 768px)');
  const { id } = useParams();

  const systemUserArray = useAppSelector((state) => state.overviewPage.systemUserArray);

  useEffect(() => {
    dispatch(fetchSystemRegisterProducts()); // TODO, move?
    dispatch(fetchOverviewPage());
  }, [dispatch]);

  const systemUser = systemUserArray?.find((user) => user.id === id);
  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
        icon={<ApiIcon />}
        title={'Rediger systembruker'}
      >
        {systemUser && <DetailPageContent systemUser={systemUser} />}
      </Page>
    </PageContainer>
  );
};
