import React from 'react';

import classes from './Page.module.css';
import cn from 'classnames';
import { PageHeader } from './';
import { useMediaQuery } from '@/resources/hooks';

export interface PageProps {
  children?: React.ReactNode;
  icon?: React.JSX.Element;
  title?: React.ReactNode;
  color?: 'dark' | 'light' | 'success' | 'danger';
}

export const Page = ({ children, icon, title, color = 'dark' }: PageProps) => {
  const size = useMediaQuery('(max-width: 768px)') ? 'small' : 'medium';
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
