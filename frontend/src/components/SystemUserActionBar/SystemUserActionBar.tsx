import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading, Link } from '@digdir/designsystemet-react';
import { ActionBar } from '../ActionBar';
import classes from './SystemUserActionBar.module.css';
import { TenancyIcon, PencilIcon } from '@navikt/aksel-icons';
import { SystemUser } from '@/types';
import { AuthenticationRoute } from '@/routes/paths';
import { url } from '@/utils/urlUtils';
import { RightsList } from '../RightsList';

interface SystemUserActionBarProps {
  systemUser: SystemUser;
  defaultOpen?: boolean;
}

export const SystemUserActionBar = ({
  systemUser,
  defaultOpen,
}: SystemUserActionBarProps): React.JSX.Element => {
  const { t } = useTranslation();

  const totalNumberOfRights =
    (systemUser.resources.length ?? 0) + (systemUser.accessPackages.length ?? 0);

  return (
    <ActionBar
      title={systemUser.integrationTitle}
      subtitle={systemUser.supplierName?.toUpperCase()}
      icon={
        <div className={classes.icon}>
          <TenancyIcon />
        </div>
      }
      color='light'
      size='large'
      defaultOpen={defaultOpen}
    >
      <div>
        <div className={classes.rightsHeader}>
          <Heading level={3} data-size='2xs'>
            {totalNumberOfRights === 0 && t('authent_overviewpage.system_user_no_rights')}
            {totalNumberOfRights === 1 && t('authent_overviewpage.system_single_right_header')}
            {totalNumberOfRights > 1 && t('authent_overviewpage.system_rights_header')}
          </Heading>
          <Link asChild data-size='sm'>
            <RouterLink to={`${AuthenticationRoute.Details}/${url`${systemUser.id}`}`}>
              <PencilIcon fontSize={24} />
              {t('authent_overviewpage.edit_system_user')}
            </RouterLink>
          </Link>
        </div>
        <RightsList
          resources={systemUser.resources ?? []}
          accessPackages={systemUser.accessPackages}
        />
      </div>
    </ActionBar>
  );
};
