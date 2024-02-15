import React from 'react';
import { Buildings3FillIcon } from '@navikt/aksel-icons';
import { ReactComponent as AltinnLogo } from '@/assets/AltinnTextLogo.svg';
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
            {userInfo?.userName && <h5 className={classes.userInfoText}>{userInfo.userName}</h5>}
            {userInfo?.organizationName && (
              <h5 className={classes.userInfoText}>for {userInfo.organizationName}</h5>
            )}
          </div>
          <Buildings3FillIcon className={classes.companyIcon} />
        </div>
      </div>
    </div>
  );
};
