import { SvgIcon } from '@altinn/altinn-design-system';
import * as React from 'react';
import { Office1Filled } from '@navikt/ds-icons';
import { useEffect } from 'react';

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
  }, []);

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
          <div className={classes.companyIconContainer}>
            <SvgIcon
              width={24}
              height={24}
              svgIconComponent={<Office1Filled />}
            ></SvgIcon>
          </div>
        </div>
      </div>
    </div>
  );
};
