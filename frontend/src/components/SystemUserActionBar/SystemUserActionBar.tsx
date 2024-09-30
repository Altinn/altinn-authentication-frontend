import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading, Link } from '@digdir/designsystemet-react';
import { ActionBar } from '../ActionBar';
import classes from './SystemUserActionBar.module.css';
import { PencilIcon } from '@navikt/aksel-icons';
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

  return (
    <ActionBar
      title={systemUser.integrationTitle}
      subtitle={systemUser.supplierName?.toUpperCase()}
      color='light'
      size='large'
      defaultOpen={defaultOpen}
    >
      <div>
        <div className={classes.rightsHeader}>
          <Heading level={3} size='xxsmall' spacing>
            {!systemUser?.resources.length
              ? t('authent_overviewpage.system_user_no_rights')
              : t('authent_overviewpage.system_rights_header')}
          </Heading>
          <Link asChild>
            <RouterLink to={`${AuthenticationRoute.Details}/${url`${systemUser.id}`}`}>
              <PencilIcon fontSize={24} />
              {t('authent_overviewpage.edit_system_user')}
            </RouterLink>
          </Link>
        </div>
        <RightsList resources={systemUser?.resources ?? []} />
      </div>
    </ActionBar>
  );
};
