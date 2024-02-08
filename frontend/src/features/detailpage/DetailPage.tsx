import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from '@digdir/design-system-react';
import { Page, PageContainer } from '@/components';
import { DetailPageContent } from './DetailPageContent';
import { ReactComponent as ApiIcon } from '@/assets/Api.svg';
import { useMediaQuery } from '@/resources/hooks';
import { useGetRightsQuery, useGetSystemUserQuery } from '@/rtk/features/systemUserApi';

export const DetailPage = (): React.ReactNode => {
  const isSm = useMediaQuery('(max-width: 768px)');
  const { id } = useParams();

  const { data: systemUser, isError: isLoadSystemUserError } = useGetSystemUserQuery(id || '');
  const { data: rights, isError: isLoadRightsError } = useGetRightsQuery();

  return (
    <PageContainer>
      <Page
        color='dark'
        size={isSm ? 'small' : 'medium'}
        icon={<ApiIcon />}
        title={'Rediger systembruker'}
      >
        {isLoadSystemUserError && <Alert severity='danger'>Kunne ikke laste systembruker</Alert>}
        {isLoadRightsError && <Alert severity='danger'>Kunne ikke laste rettigheter</Alert>}
        {systemUser && rights && <DetailPageContent systemUser={systemUser} rights={rights} />}
      </Page>
    </PageContainer>
  );
};
