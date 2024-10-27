import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceResource } from '@/types';
import { ActionBar } from '../ActionBar';
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';

interface RightsListProps {
  resources: ServiceResource[];
}

export const RightsList = ({ resources }: RightsListProps): React.ReactNode => {
  const { i18n } = useTranslation();
  const currentLanguage = i18nLanguageToShortLanguageCode(i18n.language);
  return resources.map((resource) => {
    return (
      <ActionBar
        key={resource.identifier}
        title={resource.title?.[currentLanguage]}
        logoUrl={resource.logoUrl}
        subtitle={resource?.hasCompetentAuthority?.name?.[currentLanguage]}
        color='neutral'
      >
        <div>{resource.description?.[currentLanguage]}</div>
      </ActionBar>
    );
  });
};
