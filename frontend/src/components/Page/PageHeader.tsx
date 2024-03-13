import React from 'react';
import cn from 'classnames';
import classes from './PageHeader.module.css';

export interface PageHeaderProps {
  children?: React.ReactNode;
  icon?: React.JSX.Element;
  color: 'dark' | 'light' | 'success' | 'danger';
}

export const PageHeader = ({ children, icon, color }: PageHeaderProps) => {
  return (
    <header className={cn(classes.pageHeader, classes[color])}>
      <span className={classes.icon}>{icon}</span>
      <h1 className={classes.headerText}>{children}</h1>
    </header>
  );
};
