import React from 'react';
import cn from 'classnames';
import { Button, Paragraph } from '@digdir/designsystemet-react';

import { useActionBarContext } from './Context';
import classes from './ActionBarHeader.module.css';
import { ActionBarIcon } from './ActionBarIcon';
import { type ActionBarProps } from './ActionBar';

export type ActionBarHeaderProps = Pick<
  ActionBarProps,
  'title' | 'subtitle' | 'icon' | 'additionalText'
>;

export const ActionBarHeader = ({
  additionalText,
  subtitle,
  title,
  icon,
}: ActionBarHeaderProps): React.ReactNode => {
  const { open, toggleOpen, contentId, headerId, color, size } = useActionBarContext();

  let headingSize: 'sm' | 'md' | 'lg' | 'xs';
  switch (size) {
    case 'large':
      headingSize = 'lg';
      break;
    case 'medium':
      headingSize = 'sm';
      break;
    case 'small':
      headingSize = 'xs';
      break;
  }

  const actionBarContent: React.ReactNode = (
    <div className={classes.titleWrapper}>
      {icon}
      <div>
        <Paragraph data-size={headingSize} className={classes.title}>
          {title}
        </Paragraph>
        {subtitle && (
          <Paragraph data-size='xs' className={classes.subtitle}>
            {subtitle}
          </Paragraph>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={cn(classes.actionBar, classes[color], classes[size], {
        [classes.subtitle]: subtitle,
        [classes.open]: open,
      })}
    >
      <Button
        className={cn(classes.actionBarHeader, classes[color])}
        type='button'
        variant='tertiary'
        onClick={toggleOpen}
        id={headerId}
        data-testid='action-bar'
        aria-expanded={open}
        aria-controls={contentId}
      >
        <div className={classes.actionBarButtonContainer}>
          {actionBarContent}
          <ActionBarIcon />
        </div>
      </Button>
      {additionalText}
    </div>
  );
};

ActionBarHeader.displayName = 'ActionBarHeader';
