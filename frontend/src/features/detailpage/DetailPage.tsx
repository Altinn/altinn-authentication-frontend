import React from 'react';
import { useParams } from 'react-router-dom';
import { Page, PageContainer } from '@/components';
import { DetailPageContent } from './DetailPageContent';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { useGetSystemUserQuery } from '@/rtk/features/systemUserApi';

export const DetailPage = (): React.ReactNode => {
  const isSm = useMediaQuery('(max-width: 768px)');
  const { id } = useParams();

  const { data: systemUser } = useGetSystemUserQuery(id || '');

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
