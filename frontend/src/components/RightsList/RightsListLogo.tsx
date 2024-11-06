import React from 'react';
import classes from './RightsListLogo.module.css';

interface RightsListLogoProps {
  logoUrl: string;
}

export const RightsListLogo = ({ logoUrl }: RightsListLogoProps): React.ReactNode => {
  return (
    <div className={classes.logoWrapper}>
      <img className={classes.logoImg} src={logoUrl} aria-hidden />
    </div>
  );
};
