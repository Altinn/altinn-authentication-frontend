import React from 'react';
import cn from 'classnames';
import { ChevronDownIcon as Chevron } from '@navikt/aksel-icons';

import classes from './ActionBarIcon.module.css';
import { useActionBarContext } from './Context';

export const ActionBarIcon = () => {
  const { open, size } = useActionBarContext();
  const iconClassnames = [
    classes.actionBarIcon,
    {
      [classes.open]: open,
    },
  ];
  const props = {
    className: cn(iconClassnames, classes[size]),
    'data-testid': 'action-bar-icon',
  };

  return <Chevron {...props} aria-hidden />;
};
