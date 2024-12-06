import React from 'react';
import cn from 'classnames';

import classes from './ActionBarContent.module.css';
import { useActionBarContext } from './Context';
import { type ActionBarProps } from './ActionBar';

export type ActionBarContentProps = Pick<ActionBarProps, 'children'>;

export const ActionBarContent = ({ children }: ActionBarContentProps): React.ReactNode => {
  const { open, contentId, headerId, color, size } = useActionBarContext();

  return (
    <>
      {open && (
        <div
          aria-expanded={open}
          id={contentId}
          aria-labelledby={headerId}
          className={cn(classes.actionBarContent, classes[color], classes[size])}
        >
          {children}
        </div>
      )}
    </>
  );
};

ActionBarContent.displayName = 'ActionBarContent';
