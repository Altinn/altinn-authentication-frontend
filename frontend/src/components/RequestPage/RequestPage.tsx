import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import classes from './RequestPage.module.css';
import { ProfileInfo, VendorSystem } from '@/types';
import AltinnLogo from '@/assets/AltinnTextLogo.svg?react';
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';

interface RequestPageProps {
  userInfo?: ProfileInfo;
  system?: VendorSystem;
  heading: string;
  children: React.ReactNode | React.ReactNode[];
}

export const RequestPage = ({
  userInfo,
  system,
  heading,
  children,
}: RequestPageProps): React.ReactNode => {
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
        <div className={classes.vendorRequestBlock}>
          <Heading level={1} data-size='lg'>
            {heading}
          </Heading>
        </div>
        <div className={classes.vendorRequestBlock}>{children}</div>
        {system && (
          <Paragraph data-size='sm' className={classes.vendorInfo}>
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
