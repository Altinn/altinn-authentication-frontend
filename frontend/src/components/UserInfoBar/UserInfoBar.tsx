import React from 'react';
import { Buildings3FillIcon } from '@navikt/aksel-icons';
import AltinnLogo from '@/assets/AltinnTextLogo.svg?react';
import classes from './UserInfoBar.module.css';
import { useGetLoggedInUserQuery } from '@/rtk/features/userApi';

export const UserInfoBar = () => {
  const { data: userInfo } = useGetLoggedInUserQuery();

  return (
    <div>
      <div className={classes.userInfoBar}>
        <div>
          <AltinnLogo />
        </div>
        <div className={classes.userInfoContent}>
          <div>
            {userInfo?.loggedInPersonName && (
              <div className={classes.userInfoText}>{userInfo.loggedInPersonName}</div>
            )}
            {userInfo?.representingPartyName && (
              <div className={classes.userInfoText}>
                {userInfo?.loggedInPersonName && 'for '}
                {userInfo.representingPartyName}
              </div>
            )}
          </div>
          <Buildings3FillIcon className={classes.companyIcon} />
        </div>
      </div>
    </div>
  );
};
