import * as React from 'react';
import cn from 'classnames';
import { SvgIcon } from '@altinn/altinn-design-system';

import classes from './PageHeader.module.css';

export interface PageHeaderProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  color: 'dark' | 'light' | 'success' | 'danger';
  size: 'small' | 'medium';
}

export const PageHeader = ({ children, icon, color, size }: PageHeaderProps) => {
  return (
    <header className={cn(classes.pageHeader, classes[color], classes[size])}>
      <SvgIcon className={cn(classes.icon, classes[size])} svgIconComponent={icon} />
      <h1 className={classes.headerText}>{children}</h1>
    </header>
  );
};
