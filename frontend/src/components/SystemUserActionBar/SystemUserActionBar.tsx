import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading, Link, Paragraph } from '@digdir/designsystemet-react';
import { ActionBar } from '../ActionBar';
import classes from './SystemUserActionBar.module.css';
import { PencilIcon } from '@navikt/aksel-icons';
import { useGetVendorsQuery } from '@/rtk/features/systemUserApi';
import { SystemUser } from '@/types';
import { AuthenticationRoute } from '@/routes/paths';
import { url } from '@/utils/urlUtils';
import { RightsList } from '../RightsList/RightsList';

interface SystemUserActionBarProps {
  systemUser: SystemUser;
  defaultOpen?: boolean;
}

export const SystemUserActionBar = ({
  systemUser,
  defaultOpen,
}: SystemUserActionBarProps): React.JSX.Element => {
  const { t } = useTranslation();

  const { data: vendors } = useGetVendorsQuery();

  const vendor = vendors?.find((vendor) => vendor.systemId === systemUser.productName);

  return (
    <ActionBar
      title={systemUser.integrationTitle}
      subtitle={vendor?.systemVendorOrgName?.toUpperCase()}
      color='light'
      size='large'
      defaultOpen={defaultOpen}
    >
      <div className={classes.systemUserContent}>
        {false && (
          <div className={classes.rightAlignedContainer}>
            <Link asChild>
              <RouterLink to={`${AuthenticationRoute.Details}/${url`${systemUser.id}`}`}>
                <PencilIcon fontSize={24} />
                {t('authent_overviewpage.edit_system_user')}
              </RouterLink>
            </Link>
          </div>
        )}
        <div>
          <Heading level={3} size='xxsmall' spacing>
            {!vendor?.rights.length
              ? t('authent_overviewpage.system_user_no_rights')
              : t('authent_overviewpage.system_rights_header')}
          </Heading>
          <RightsList rights={vendor?.rights ?? []} />
        </div>
        <div className={classes.rightAlignedContainer}>
          <Paragraph size='xs' className={classes.lastEditText}>
            {t('authent_overviewpage.system_user_last_edit', {
              createdDate: new Date(systemUser.created).toLocaleDateString('no-NB', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
              }),
              lastChangeName: 'TODO',
            })}
          </Paragraph>
        </div>
      </div>
    </ActionBar>
  );
};
