import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChevronRightDoubleCircleFillIcon,
  FilesFillIcon,
  ChevronRightDoubleIcon,
} from '@navikt/aksel-icons'; // Fix-me: should be non-filled icon: note ActionBar size medium uses this
import { ReactComponent as Edit } from '@/assets/Edit.svg';

import { Button, Paragraph } from '@digdir/design-system-react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { ActionBar, type ActionBarProps } from '../ActionBar';

import classes from './InnerCollectionBar.module.css';

// added/extended subtitle and additionalText as props of CollectionBar as child ActionBar has such props
// 05.12.23: Beskrivelse/comment/addtionalText is removed in Design of 24.11.23:
// if this persists the props should be reorganized
// 17.01.24: version of CollectionBar --> used in CollectionBar-inside-CollectionBar on OverviewPage

export interface InnerCollectionBarProps extends Pick<ActionBarProps, 'color' | 'title'| 'subtitle' | 'additionalText' > {
  /** The list of selected objects */
  collection: React.ReactNode[];

  /** When true saves as much space as possible. Usually used for smaller screens */
  compact?: boolean;

  /** The path to redirect to when pressing the proceed button */
  proceedToPath?: string;
}

export const InnerCollectionBar = ({
  color = 'warning',
  title,
  subtitle,
  additionalText,
  collection,
  compact = false,
  proceedToPath,
}: InnerCollectionBarProps) => {
  const { t } = useTranslation('common');

  return (
    <>
      <ActionBar
        title={ title }
        subtitle={ subtitle }
        size='medium'
        color={"warning"}
      >
        <div className={cn(classes.content, { [classes.compact]: compact })}>{collection}</div>
      </ActionBar>
    </>
  );
};
