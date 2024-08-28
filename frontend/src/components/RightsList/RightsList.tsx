import React from 'react';
import { useTranslation } from 'react-i18next';
import { SystemRight, ValidLanguage } from '@/types';
import { ActionBar } from '../ActionBar';

interface RightsListProps {
  rights: SystemRight[];
}

export const RightsList = ({ rights }: RightsListProps): React.ReactNode => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as ValidLanguage;
  return rights
    .filter((productRight) => !!productRight.serviceResource)
    .map((productRight) => {
      return (
        <ActionBar
          key={productRight.serviceResource.identifier}
          title={productRight.serviceResource.title?.[currentLanguage]}
          subtitle={productRight.serviceResource?.hasCompetentAuthority?.name?.[currentLanguage]}
          color='neutral'
        >
          <div>{productRight.serviceResource.description?.[currentLanguage]}</div>
        </ActionBar>
      );
    });
};
