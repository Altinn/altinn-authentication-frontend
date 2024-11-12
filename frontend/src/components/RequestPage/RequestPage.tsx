import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '@digdir/designsystemet-react';
import classes from './RequestPage.module.css';
import { ProfileInfo, VendorSystem } from '@/types';
import AltinnLogo from '@/assets/AltinnTextLogo.svg?react';
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';

interface RequestPageProps {
  userInfo?: ProfileInfo;
  system?: VendorSystem;
  children: React.ReactNode | React.ReactNode[];
}

export const RequestPage = ({ userInfo, system, children }: RequestPageProps): React.ReactNode => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18nLanguageToShortLanguageCode(i18n.language);

  return (
    <div className={classes.requestPage}>
      <div className={classes.requestWrapper}>
        <div className={classes.headerContainer}>
          <AltinnLogo />
          {userInfo && (
            <div>
              <div>{userInfo?.loggedInPersonName}</div>
              <div>for {userInfo?.representingPartyName}</div>
            </div>
          )}
        </div>
        {children}
        {system && (
          <Paragraph size='sm' className={classes.vendorInfo}>
            {t('vendor_request.org_nr', {
              systemName: system.name[currentLanguage],
              vendorName: system.systemVendorOrgName,
              vendorOrg: system.systemVendorOrgNumber.match(/.{1,3}/g)?.join(' '),
            })}
          </Paragraph>
        )}
      </div>
    </div>
  );
};
