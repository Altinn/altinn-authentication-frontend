import React from 'react';
import classes from './RightsListLogo.module.css';

interface RightsListLogoProps {
  logoUrl: string;
  altText?: string;
}

export const RightsListLogo = ({ logoUrl, altText }: RightsListLogoProps): React.ReactNode => {
  return (
    <div className={classes.logoWrapper}>
      <img className={classes.logoImg} src={logoUrl} alt={altText} />
    </div>
  );
};
