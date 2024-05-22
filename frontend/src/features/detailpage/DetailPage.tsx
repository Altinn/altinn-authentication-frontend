import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spinner } from '@digdir/designsystemet-react';
import { Page, PageContainer } from '@/components';
import { DetailPageContent } from './DetailPageContent';
import ApiIcon from '@/assets/Api.svg?react';
import { useGetSystemUserQuery } from '@/rtk/features/systemUserApi';

export const DetailPage = (): React.ReactNode => {
  const { id } = useParams();

  const {
    data: systemUser,
    isError: isLoadSystemUserError,
    isLoading: isLoadingSystemUser,
  } = useGetSystemUserQuery(id || '');

  return (
    <PageContainer>
      <Page color='dark' icon={<ApiIcon />} title={'Rediger systemtilgang'}>
        {isLoadingSystemUser && <Spinner title='laster systemtilgang' />}
        {isLoadSystemUserError && <Alert severity='danger'>Kunne ikke laste systemtilgang</Alert>}
        {systemUser && <DetailPageContent systemUser={systemUser} />}
      </Page>
    </PageContainer>
  );
};
