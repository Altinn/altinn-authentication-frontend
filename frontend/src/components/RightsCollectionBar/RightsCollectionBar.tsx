import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChevronRightDoubleCircleFillIcon,
  FilesFillIcon,
  ChevronRightDoubleIcon,
} from '@navikt/aksel-icons'; // Fix-me: should be non-filled icon
import { Button, Paragraph } from '@digdir/design-system-react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ActionBar, type ActionBarProps } from '../ActionBar';
import classes from './RightsCollectionBar.module.css';

// The component RightsCollectionBar is a version of CollectionBar for RightsIncludedPage
// It has no text on the right (although button is not removed yet, the consensus in meetings
// seems to be that Rights should not be edited here in our app, but in AccessManagement)
// FIX-ME: component should be cleaned up and simplified if no further changes arrive from Design

// added/extended subtitle and additionalText as props of CollectionBar as child ActionBar has such props
// 05.12.23: Beskrivelse/comment/addtionalText is removed in Design of 24.11.23:
// if this persists the props should be reorganized

export interface RightsCollectionBarProps extends Pick<ActionBarProps, 'color' | 'title'| 'subtitle' | 'additionalText' > {
  /** The list of selected objects */
  collection: React.ReactNode[];

  /** When true saves as much space as possible. Usually used for smaller screens */
  compact?: boolean;

  /** The path to redirect to when pressing the proceed button */
  proceedToPath?: string;
}

export const RightsCollectionBar = ({
  color = 'neutral',
  title,
  subtitle,
  additionalText,
  collection,
  compact = false,
  proceedToPath,
}: RightsCollectionBarProps) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  // Edit Button is not used: but might be added back later
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
              
              color={"danger"}
              onClick={proceedClick}
            >
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
