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
            {userInfo?.userName && <div className={classes.userInfoText}>{userInfo.userName}</div>}
            {userInfo?.organizationName && (
              <div className={classes.userInfoText}>
                {userInfo?.userName && 'for '}
                {userInfo.organizationName}
              </div>
            )}
          </div>
          <Buildings3FillIcon className={classes.companyIcon} />
        </div>
      </div>
    </div>
  );
};
