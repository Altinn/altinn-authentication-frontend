import React, { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthenticationRoute } from '@/routes/paths';
import cn from 'classnames';
import classes from './OverviewPageContent.module.css';
import { ActionBar } from '@/components';
import { PlusIcon, PencilWritingIcon } from '@navikt/aksel-icons';
import { Button, Heading, Link } from '@digdir/design-system-react';
import { useMediaQuery } from '@/resources/hooks';
import { useTranslation } from 'react-i18next';
import { useGetRightsQuery, useGetSystemUsersQuery } from '@/rtk/features/systemUserApi';
import { useAppDispatch } from '@/rtk/app/hooks';
import { setCreateValues } from '@/rtk/features/createSystemUserSlice';

export const OverviewPageContent = () => {
  // Fix-me: CollectionBar links go nowhere yet
  const { data: systemUsers } = useGetSystemUsersQuery();
  const { data: rights } = useGetRightsQuery();

  const dispatch = useAppDispatch();
  const { t } = useTranslation('common'); // not used yet
  const navigate = useNavigate();

  useEffect(() => {
    // reset create wizard values when overviewPage is rendered; the user ends up here after create, cancel or back navigation
    dispatch(setCreateValues({ integrationTitle: '', selectedSystemType: '' }));
  }, [dispatch]);

  // Eldre greier: bør byttes ut, men kan trenges for Mobil-optimering
  const isSm = useMediaQuery('(max-width: 768px)'); // ikke i bruk lenger

  const goToStartNewSystemUser = () => {
    navigate(AuthenticationRoute.Creation);
  };

  return (
    <div>
      <Heading level={2} size='small' spacing>
        {t('authent_overviewpage.sub_title')}
      </Heading>
      <div className={classes.systemUserNewButton}>
        <Button variant='secondary' onClick={goToStartNewSystemUser} fullWidth={isSm}>
          <PlusIcon />
          {t('authent_overviewpage.new_system_user_button')}
        </Button>
      </div>
      <Heading level={2} size='small' spacing>
        {t('authent_overviewpage.existing_system_users_title')}
      </Heading>
      {systemUsers?.map((systemUser) => (
        <ActionBar
          key={systemUser.id}
          title={systemUser.integrationTitle}
          subtitle={`${systemUser.productName}`}
          color='light'
          size='large'
        >
          <div className={cn(classes.accordionContent, { [classes.compact]: isSm })}>
            <div className={classes.rightsHeader}>
              <Heading level={3} size='xxsmall' spacing>
                Systembrukeren har disse rettighetene:
              </Heading>
              <Link as={RouterLink} to={`${AuthenticationRoute.Details}/${systemUser.id}`}>
                <PencilWritingIcon height={'1.25rem'} width={'1.25rem'} />
                Rediger systembruker
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
