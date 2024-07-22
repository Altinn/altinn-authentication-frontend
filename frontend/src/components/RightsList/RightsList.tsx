import React from 'react';
import { SystemRight } from '@/types';
import { ActionBar } from '../ActionBar';

interface RightsListProps {
  rights: SystemRight[];
}

export const RightsList = ({ rights }: RightsListProps): React.ReactNode => {
  return rights.map((productRight) => (
    <ActionBar
      key={JSON.stringify(productRight.resources)}
      title={productRight.resources.map(({ value }) => value).join(', ')}
      subtitle={productRight.serviceProvider}
      color='neutral'
    />
  ));
};
