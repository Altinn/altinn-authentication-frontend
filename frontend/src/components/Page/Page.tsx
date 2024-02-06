import * as React from 'react';

import classes from './Page.module.css';
import cn from 'classnames';
import { PageHeader } from './';

export interface PageProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  color?: 'dark' | 'light' | 'success' | 'danger';
  size?: 'small' | 'medium';
}

export const Page = ({ children, icon, title, color = 'dark', size = 'medium' }: PageProps) => {
  return (
    <div className={classes.page}>
      {title && (
        <PageHeader color={color} size={size} icon={icon}>
          {title}
        </PageHeader>
      )}
      <div className={cn(classes.pageContent, classes[size])}>{children}</div>
    </div>
  );
};
