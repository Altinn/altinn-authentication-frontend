import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './OverviewPageContent.module.css';
import { PlusIcon } from '@navikt/aksel-icons';
import { Alert, Button, Heading, Paragraph, Spinner } from '@digdir/designsystemet-react';
import { useFirstRenderEffect } from '@/resources/hooks';
import { useTranslation } from 'react-i18next';
import { useGetSystemUsersQuery } from '@/rtk/features/systemUserApi';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { setSelectedSystemType } from '@/rtk/features/createSystemUserSlice';
import { SystemUserActionBar } from '@/components/SystemUserActionBar';
import { useGetLoggedInUserQuery } from '@/rtk/features/userApi';

export const OverviewPageContent = () => {
  const {
    data: systemUsers,
    isLoading: isLoadingSystemUsers,
    isError: isLoadSystemUsersError,
  } = useGetSystemUsersQuery();

  const { data: userInfo, isLoading: isLoadingUserInfo } = useGetLoggedInUserQuery();

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const newlyCreatedId = useAppSelector((state) => state.createSystemUser.newlyCreatedId);
  const newlyCreatedItem = systemUsers?.find((systemUser) => systemUser.id === newlyCreatedId);

  // reset create wizard values when overviewPage is rendered; the user ends up here after create, cancel or back navigation
  useFirstRenderEffect(() => {
    dispatch(setSelectedSystemType({ systemId: '', friendlySystemName: '' }));
  });

  const goToStartNewSystemUser = () => {
    navigate(AuthenticationRoute.Creation);
  };

  const userCanCreateSystemUser = userInfo?.canCreateSystemUser;

  const systemUsersWithoutCreatedItem =
    systemUsers &&
    [...systemUsers].reverse().filter((systemUser) => systemUser.id !== newlyCreatedId);

  if (isLoadingUserInfo || isLoadingSystemUsers) {
    return <Spinner title={t('authent_overviewpage.loading_systemusers')} />;
  }

  return (
    <div>
      {(!userCanCreateSystemUser || (systemUsers && systemUsers.length === 0)) && (
        <>
          <Heading level={2} size='xsmall' spacing>
            {t('authent_overviewpage.sub_title')}
          </Heading>
          <Paragraph spacing>{t('authent_overviewpage.sub_title_text')}</Paragraph>
        </>
      )}
      <div>
        <Button
          variant='secondary'
          onClick={goToStartNewSystemUser}
          disabled={!userCanCreateSystemUser}
        >
          <PlusIcon fontSize={28} />
          {systemUsers && systemUsers.length === 0
            ? t('authent_overviewpage.new_first_system_user_button')
            : t('authent_overviewpage.new_system_user_button')}
        </Button>
      </div>
      {!userCanCreateSystemUser && (
        <Paragraph className={classes.noRightsParagraph}>
          <span className={classes.noRightsParagraphBold}>
            {t('authent_overviewpage.no_key_role1')}{' '}
          </span>
          {t('authent_overviewpage.no_key_role2')}
        </Paragraph>
      )}
      {isLoadSystemUsersError && (
        <Alert severity='danger'>{t('authent_overviewpage.systemusers_load_error')}</Alert>
      )}
      {newlyCreatedItem && (
        <div>
          <Heading level={2} size='xsmall' spacing className={classes.systemUserHeader}>
            {t('authent_overviewpage.created_system_user_title')}
          </Heading>
          <SystemUserActionBar systemUser={newlyCreatedItem} defaultOpen />
        </div>
      )}
      {systemUsersWithoutCreatedItem && systemUsersWithoutCreatedItem.length > 0 && (
        <>
          <Heading level={2} size='xsmall' spacing className={classes.systemUserHeader}>
            {newlyCreatedItem
              ? t('authent_overviewpage.existing_earlier_system_users_title')
              : t('authent_overviewpage.existing_system_users_title')}
          </Heading>
          {systemUsersWithoutCreatedItem.map((systemUser) => (
            <SystemUserActionBar key={systemUser.id} systemUser={systemUser} />
          ))}
        </>
      )}
    </div>
  );
};
