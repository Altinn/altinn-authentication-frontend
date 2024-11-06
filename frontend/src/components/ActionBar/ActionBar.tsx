import React, { useId, useState, forwardRef } from 'react';

import { type ClickHandler, ActionBarContext } from './Context';
import { ActionBarContent } from './ActionBarContent';
import { ActionBarHeader } from './ActionBarHeader';

export interface ActionBarProps {
  /** Additional text to be displayed on the right side of the header of the ActionBar. */
  additionalText?: React.ReactNode;

  /** The content to be displayed as expandable content inside the ActionBar. */
  children?: React.ReactNode;

  /** The color variant of the ActionBar. */
  color?: 'light' | 'neutral' | 'transparent';

  /** The size variant of the ActionBar. */
  size?: 'small' | 'medium' | 'large';

  /** The click event handler for the ActionBar header. */
  onClick?: ClickHandler;

  /** Specifies whether the ActionBar is open or closed. */
  open?: boolean;

  /**  Defaults the ActionBar to open if not controlled */
  defaultOpen?: boolean;

  /** The subtitle to be displayed in the header of the ActionBar. */
  subtitle?: React.ReactNode;

  /** The title to be displayed in the header of the ActionBar. */
  title?: React.ReactNode;

  /** The logo image to be displayed in the header of the ActionBar. */
  icon?: React.ReactNode;
}

/**
 * @component
 * @example
 * <ActionBar
 *    additionalText=<div>"Additional Text"</div>
 *    color="neutral"
 *    size="medium"
 *    open={openState}
 *    onClick={handleActionBarClick}
 *    subtitle={<div>"Subtitle"</div>}
 *    title={<div>"Title"</div>}
 *   >
 *      <div>Content goes here</div>
 * </ActionBar>
 *
 * @property {React.ReactNode} [additionalText] - Additional text to be displayed in the header of the ActionBar.
 * @property {React.ReactNode} [children] - The content to be displayed as expandable content inside the ActionBar.
 * @property {'light' | 'neutral' | 'transparent'} [color='neutral'] - The color variant of the ActionBar.
 * @property {'small' | 'medium' | 'large'} [size='medium'] - The size variant of the ActionBar.
 * @property {boolean} [open] - Specifies whether the ActionBar is open or closed.
 * @property {ClickHandler} [onClick] - The click event handler for the ActionBar header.
 * @property {boolean} [defaultOpen=false] - Defaults the ActionBar to open if not controlled.
 * @property {React.ReactNode} [subtitle] - The subtitle to be displayed in the header of the ActionBar.
 * @property {React.ReactNode} [title] - The title to be displayed in the header of the ActionBar.
 * @property {React.ReactNode} [icon] - The logo image to be displayed in the header of the ActionBar.
 * @returns {React.ReactNode} The rendered ActionBar component.
 */

export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  (
    {
      additionalText,
      children,
      color = 'neutral',
      size = 'medium',
      onClick,
      open,
      defaultOpen = false,
      subtitle,
      title,
      icon,
    },
    ref,
  ) => {
    const headerId = useId();
    const contentId = useId();

    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const isOpen = open ?? internalOpen;

    const toggleOpen = children
      ? () => {
          if (onClick) {
            onClick();
          } else {
            setInternalOpen((openState) => !openState);
          }
        }
      : undefined;

    return (
      <div ref={ref}>
        <ActionBarContext.Provider
          value={{
            toggleOpen,
            open: isOpen,
            headerId,
            contentId,
            color,
            size,
          }}
        >
          <ActionBarHeader
            title={title}
            subtitle={subtitle}
            icon={icon}
            additionalText={additionalText}
          ></ActionBarHeader>
          <ActionBarContent>{children}</ActionBarContent>
        </ActionBarContext.Provider>
      </div>
    );
  },
);

ActionBar.displayName = 'ActionBar';
