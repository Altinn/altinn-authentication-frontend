import React, { useEffect } from 'react';
import classes from './Page.module.css';
import { PageHeader } from './';

export interface PageProps {
  children?: React.ReactNode;
  icon?: React.JSX.Element;
  title?: string;
  color?: 'dark' | 'light' | 'success' | 'danger';
}

export const Page = ({ children, icon, title, color = 'dark' }: PageProps) => {
  useEffect(() => {
    document.title = title ? `${title} - Altinn` : 'Altinn';
  }, [title]);

  return (
    <div className={classes.page}>
      {title && (
        <PageHeader color={color} icon={icon}>
          {title}
        </PageHeader>
      )}
      <div className={classes.pageContent}>{children}</div>
    </div>
  );
};
