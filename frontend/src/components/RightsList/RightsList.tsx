import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceResource } from '@/types';
import { ActionBar } from '../ActionBar';
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';
import { RightsListLogo } from './RightsListLogo';

interface RightsListProps {
  resources: ServiceResource[];
}

export const RightsList = ({ resources }: RightsListProps): React.ReactNode => {
  const { i18n } = useTranslation();
  const currentLanguage = i18nLanguageToShortLanguageCode(i18n.language);
  return (
    <ul className='unstyledList'>
      {resources.map((resource) => {
        return (
          <li key={resource.identifier}>
            <ActionBar
              title={resource.title?.[currentLanguage]}
              icon={
                resource.logoUrl && (
                  <RightsListLogo
                    logoUrl={resource.logoUrl}
                    altText={resource?.hasCompetentAuthority?.name?.[currentLanguage]}
                  />
                )
              }
              subtitle={resource?.hasCompetentAuthority?.name?.[currentLanguage]}
              color='neutral'
            >
              <div>{resource.description?.[currentLanguage]}</div>
            </ActionBar>
          </li>
        );
      })}
    </ul>
  );
};
