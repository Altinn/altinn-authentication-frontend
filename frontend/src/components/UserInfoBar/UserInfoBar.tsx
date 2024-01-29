import React, { useEffect } from 'react';
import { Office1Filled } from '@navikt/ds-icons';

import { ReactComponent as AltinnLogo } from '@/assets/AltinnTextLogo.svg';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { fetchUserInfo } from '@/rtk/features/userInfo/userInfoSlice';

import classes from './UserInfoBar.module.css';

export const UserInfoBar = () => {
  const userName = useAppSelector((state) => state.userInfo.userName);
  const organizationName = useAppSelector((state) => state.userInfo.organizationName);
  const userLoading = useAppSelector((state) => state.userInfo.userLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userLoading) {
      void dispatch(fetchUserInfo());
    }
  }, [dispatch, userLoading]);

  return (
    <div>
      <div className={classes.userInfoBar}>
        <div>
          <AltinnLogo />
        </div>
        <div className={classes.userInfoContent}>
          <div>
            {userName && <h5 className={classes.userInfoText}>{userName}</h5>}
            {organizationName && <h5 className={classes.userInfoText}>for {organizationName}</h5>}
          </div>
          <Office1Filled className={classes.companyIcon} />
        </div>
      </div>
    </div>
  );
};
