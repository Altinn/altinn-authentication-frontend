import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Paragraph } from '@digdir/designsystemet-react';

import { useActionBarContext } from './Context';
import classes from './ActionBarHeader.module.css';
import { ActionBarIcon } from './ActionBarIcon';
import { type ActionBarProps } from './ActionBar';

export interface ActionBarHeaderProps
  extends Pick<ActionBarProps, 'title' | 'subtitle' | 'additionalText' | 'actions'> {}

export const ActionBarHeader = forwardRef<HTMLHeadingElement, ActionBarHeaderProps>(
  ({ additionalText, subtitle, title, actions }, ref) => {
    const { open, toggleOpen, contentId, headerId, color, size } = useActionBarContext();

    let headingSize: 'small' | 'medium' | 'large' | 'xsmall';
    switch (size) {
      case 'large':
        headingSize = 'large';
        break;
      case 'medium':
        headingSize = 'small';
        break;
      case 'small':
        headingSize = 'xsmall';
        break;
    }

    const actionBarContent: React.ReactNode = (
      <div className={classes.actionBarTexts}>
        <Paragraph size={headingSize} className={classes.title}>
          {title}
        </Paragraph>
        {subtitle && (
          <Paragraph size='xsmall' className={classes.subtitle}>
            {subtitle}
          </Paragraph>
        )}
      </div>
    );

    return (
      <div
        className={cn(classes.actionBar, classes[color], classes[size], {
          [classes.subtitle]: subtitle,
          [classes.open]: open,
          [classes.clickable]: toggleOpen,
        })}
        ref={ref}
      >
        {toggleOpen ? (
          <button
            className={cn(classes.actionBarHeader, classes.clickable, classes[color])}
            type='button'
            onClick={toggleOpen}
            id={headerId}
            data-testid='action-bar'
            aria-expanded={open}
            aria-controls={contentId}
          >
            <div className={classes.actionBarButtonContainer}>
              <div className={cn(classes.actionBarIcon, classes[size])}>
                <ActionBarIcon />
              </div>
              {actionBarContent}
            </div>
          </button>
        ) : (
          <div className={cn(classes.actionBarHeader)} id={headerId} data-testid='action-bar'>
            {actionBarContent}
          </div>
        )}
        {additionalText}

        {actions && <div className={classes.actionBarActions}>{actions}</div>}
      </div>
    );
  },
);

ActionBarHeader.displayName = 'ActionBarHeader';
