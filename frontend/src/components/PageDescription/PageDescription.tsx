import React from 'react';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import classes from './PageDescription.module.css';

interface PageDescriptionProps {
  heading: string;
  ingress: string;
}

export const PageDescription = ({ heading, ingress }: PageDescriptionProps): React.ReactNode => {
  return (
    <div className={classes.pageDescription}>
      <Heading level={2} data-size='sm'>
        {heading}
      </Heading>
      <Paragraph data-size='sm'>{ingress}</Paragraph>
    </div>
  );
};
