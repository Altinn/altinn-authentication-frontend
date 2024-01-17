import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChevronRightDoubleCircleFillIcon,
  FilesFillIcon,
  ChevronRightDoubleIcon,
} from '@navikt/aksel-icons'; // Fix-me: should be non-filled icon
import { ReactComponent as Edit } from '@/assets/Edit.svg';

import { Button, Paragraph } from '@digdir/design-system-react';
import cn from 'classnames';

import { ActionBar, type ActionBarProps } from '../ActionBar';

import classes from './OuterCollectionBar.module.css';

// added/extended subtitle and additionalText as props of CollectionBar as child ActionBar has such props
// 05.12.23: Beskrivelse/comment/addtionalText is removed in Design of 24.11.23:
// if this persists the props should be reorganized

export interface OuterCollectionBarProps extends Pick<ActionBarProps, 'color' | 'title'| 'subtitle' | 'additionalText' > {
  /** The list of selected objects */
  collection: React.ReactNode[];

  /** When true saves as much space as possible. Usually used for smaller screens */
  compact?: boolean;

}

export const OuterCollectionBar = ({
  color = 'neutral',
  title,
  subtitle,
  additionalText,
  collection,
  compact = false,
}: OuterCollectionBarProps) => {

  return (
    <>
      <ActionBar
        title={ title }
        subtitle={ subtitle }
        additionalText={
          !compact && (
            <Paragraph
              as={'span'}
              role='status'
              size='small'
              className={cn(classes.counterText, classes[color])}
            > 
              {additionalText}
            </Paragraph>
          )
        }
        size='medium'
        color={color}
      >
        <div className={cn(classes.content, { [classes.compact]: compact })}>{collection}</div>
      </ActionBar>
    </>
  );
};
