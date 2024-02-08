import React from 'react';
import cn from 'classnames';
import classes from './PageHeader.module.css';

export interface PageHeaderProps {
  children?: React.ReactNode;
  icon?: React.JSX.Element;
  color: 'dark' | 'light' | 'success' | 'danger';
  size: 'small' | 'medium';
}

export const PageHeader = ({ children, icon, color, size }: PageHeaderProps) => {
  return (
    <header className={cn(classes.pageHeader, classes[color], classes[size])}>
      {icon &&
        React.cloneElement(icon, {
          className: cn(icon.props.className, classes.icon, classes[size]),
        })}
      <h1 className={classes.headerText}>{children}</h1>
    </header>
  );
};
