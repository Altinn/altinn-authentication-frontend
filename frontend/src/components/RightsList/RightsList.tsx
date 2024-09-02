import React from 'react';
import { useTranslation } from 'react-i18next';
import { SystemRight, ValidLanguage } from '@/types';
import { ActionBar } from '../ActionBar';

interface RightsListProps {
  rights: SystemRight[];
}

const i18nLanguageToResourceLanguage = (i18nLanguage: string): ValidLanguage => {
  if (i18nLanguage === 'en') {
    return 'en';
  } else if (i18nLanguage === 'no_nn') {
    return 'nn';
  }
  return 'nb';
};

export const RightsList = ({ rights }: RightsListProps): React.ReactNode => {
  const { i18n } = useTranslation();
  const currentLanguage = i18nLanguageToResourceLanguage(i18n.language);
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
