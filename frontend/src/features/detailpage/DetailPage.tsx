import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Spinner } from '@digdir/designsystemet-react';
import { Page, PageContainer } from '@/components';
import { DetailPageContent } from './DetailPageContent';
import ApiIcon from '@/assets/Api.svg?react';
import { useGetSystemUserQuery } from '@/rtk/features/systemUserApi';
import { AuthenticationRoute } from '@/routes/paths';

export const DetailPage = (): React.ReactNode => {
  const { t } = useTranslation();
  const { id } = useParams();

  const {
    data: systemUser,
    isError: isLoadSystemUserError,
    isLoading: isLoadingSystemUser,
  } = useGetSystemUserQuery(id || '');

  return (
    <PageContainer backUrl={AuthenticationRoute.Overview}>
      <Page color='dark' icon={<ApiIcon />} title={t('authent_detailpage.edit_systemuser')}>
        {isLoadingSystemUser && <Spinner aria-label={t('authent_detailpage.loading_systemuser')} />}
        {isLoadSystemUserError && (
          <Alert data-color='danger'>{t('authent_detailpage.load_systemuser_error')}</Alert>
        )}
        {systemUser && <DetailPageContent systemUser={systemUser} />}
      </Page>
    </PageContainer>
  );
};
