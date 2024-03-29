import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './OverviewPageContent.module.css';
import { ActionBar } from '@/components';
import { PlusIcon, PencilWritingIcon } from '@navikt/aksel-icons';
import { Alert, Button, Heading, Link } from '@digdir/designsystemet-react';
import { useFirstRenderEffect } from '@/resources/hooks';
import { useTranslation } from 'react-i18next';
import { useGetRightsQuery, useGetSystemUsersQuery } from '@/rtk/features/systemUserApi';
import { useAppDispatch } from '@/rtk/app/hooks';
import { setCreateValues } from '@/rtk/features/createSystemUserSlice';
import { url } from '@/utils/urlUtils';

export const OverviewPageContent = () => {
  const { data: systemUsers, isError: isLoadSystemUsersError } = useGetSystemUsersQuery();
  const { data: rights, isError: isLoadRightsError } = useGetRightsQuery();

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // reset create wizard values when overviewPage is rendered; the user ends up here after create, cancel or back navigation
  useFirstRenderEffect(() => {
    console.log('effect');
    dispatch(setCreateValues({ integrationTitle: '', selectedSystemType: '' }));
  });

  const goToStartNewSystemUser = () => {
    navigate(AuthenticationRoute.Creation);
  };

  return (
    <div>
      <Heading level={2} size='small' spacing>
        {t('authent_overviewpage.sub_title')}
      </Heading>
      <div className={classes.systemUserNewButton}>
        <Button variant='secondary' onClick={goToStartNewSystemUser}>
          <PlusIcon />
          {t('authent_overviewpage.new_system_user_button')}
        </Button>
      </div>
      <Heading level={2} size='small' spacing>
        {t('authent_overviewpage.existing_system_users_title')}
      </Heading>
      {isLoadSystemUsersError && <Alert severity='danger'>Kunne ikke laste systembrukere</Alert>}
      {isLoadRightsError && <Alert severity='danger'>Kunne ikke laste rettigheter</Alert>}
      {systemUsers?.map((systemUser) => (
        <ActionBar
          key={systemUser.id}
          title={systemUser.integrationTitle}
          subtitle={`${systemUser.productName}`}
          color='light'
          size='large'
        >
          <div>
            <div className={classes.rightsHeader}>
              <Heading level={3} size='xxsmall' spacing>
                Systembrukeren har disse rettighetene:
              </Heading>
              <Link asChild>
                <RouterLink to={`${AuthenticationRoute.Details}/${url`${systemUser.id}`}`}>
                  <PencilWritingIcon height={'1.25rem'} width={'1.25rem'} />
                  Rediger systembruker
                </RouterLink>
              </Link>
            </div>
            {rights?.map((right) => {
              return (
                <ActionBar
                  key={right.right}
                  title={right.right}
                  subtitle={right.serviceProvider}
                  color='neutral'
                />
              );
            })}
          </div>
        </ActionBar>
      ))}
    </div>
  );
};
