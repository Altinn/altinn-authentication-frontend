import React from 'react';
import { useTranslation } from 'react-i18next';
import { SystemRight } from '@/types';
import { ActionBar } from '../ActionBar';
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';

interface RightsListProps {
  rights: SystemRight[];
  color?: 'light' | 'neutral';
  includeHeader?: boolean;
}

export const RightsList = ({ rights, color = 'neutral' }: RightsListProps): React.ReactNode => {
  const { i18n } = useTranslation();
  const currentLanguage = i18nLanguageToShortLanguageCode(i18n.language);
  return rights
    .filter((productRight) => !!productRight.serviceResource)
    .map((productRight) => {
      return (
        <ActionBar
          key={productRight.serviceResource.identifier}
          title={productRight.serviceResource.title?.[currentLanguage]}
          subtitle={productRight.serviceResource?.hasCompetentAuthority?.name?.[currentLanguage]}
          color={color}
        >
          <div>{productRight.serviceResource.description?.[currentLanguage]}</div>
        </ActionBar>
      );
    });
};
