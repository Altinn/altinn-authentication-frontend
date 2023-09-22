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
import { useNavigate } from 'react-router-dom';

import { ActionBar, type ActionBarProps } from '../ActionBar';

import classes from './CollectionBar.module.css';

// added/extended subtitle and additionalText as props of CollectionBar as child ActionBar has such props
export interface CollectionBarProps extends Pick<ActionBarProps, 'color' | 'title'| 'subtitle' | 'additionalText' > {
  /** The list of selected objects */
  collection: React.ReactNode[];

  /** When true saves as much space as possible. Usually used for smaller screens */
  compact?: boolean;

  /** The path to redirect to when pressing the proceed button */
  proceedToPath?: string;
}

export const CollectionBar = ({
  color = 'neutral',
  title,
  subtitle,
  additionalText,
  collection,
  compact = false,
  proceedToPath,
}: CollectionBarProps) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const proceedClick = () => {
    if (proceedToPath) {
      navigate(proceedToPath);
    }
  };

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
        actions={

          !compact && (
            <Button
              variant='quiet'
              size='small'
              icon={<Edit />}
              color={color === 'dark' ? 'inverted' : undefined}
              onClick={proceedClick}
            >
              {t('authentication_dummy.auth_edit_button_systembruker')}
            </Button>
          )
        }
        size='large'
        color={color}
      >
        <div className={cn(classes.content, { [classes.compact]: compact })}>{collection}</div>
      </ActionBar>

      {compact && (
        <Button
          className={classes.compactProceedButton}
          variant='quiet'
          size='small'
          icon={<ChevronRightDoubleCircleFillIcon />}
          iconPlacement='right'
          onClick={proceedClick}
        >
          {t('common.proceed')}
        </Button>
      )}
    </>
  );
};
