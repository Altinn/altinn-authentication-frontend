import React from 'react';
import { useTranslation } from 'react-i18next';
import { AccessPackage, ServiceResource } from '@/types';
import { ActionBar } from '../ActionBar';
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';
import { RightsListLogo } from './RightsListLogo';
import { Heading, Label, Paragraph } from '@digdir/designsystemet-react';
import classes from './RightsList.module.css';

interface RightsListProps {
  resources: ServiceResource[];
  accessPackages?: AccessPackage[];
}

export const RightsList = ({ resources, accessPackages }: RightsListProps): React.ReactNode => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18nLanguageToShortLanguageCode(i18n.language);
  return (
    <>
      {!!resources.length && (
        <Heading data-size='xs' level={3} className={classes.rightsListHeader}>
          {t('authent_overviewpage.single_rights')}
        </Heading>
      )}
      {resources.map((resource) => {
        return (
          <ActionBar
            key={resource.identifier}
            title={resource.title?.[currentLanguage]}
            icon={resource.logoUrl && <RightsListLogo logoUrl={resource.logoUrl} />}
            subtitle={resource?.hasCompetentAuthority?.name?.[currentLanguage]}
            color='neutral'
          >
            <div>{resource.description?.[currentLanguage]}</div>
          </ActionBar>
        );
      })}
      {!!accessPackages?.length && (
        <Heading data-size='xs' level={3} className={classes.rightsListHeader}>
          {t('authent_overviewpage.access_packages')}
        </Heading>
      )}
      {accessPackages?.map((accessPackage) => {
        return (
          <ActionBar
            key={accessPackage.id}
            title={accessPackage.name?.[currentLanguage]}
            subtitle={accessPackage.area?.name}
            color='neutral'
          >
            <Paragraph data-size='sm'>{accessPackage.description?.[currentLanguage]}</Paragraph>
            <Label data-size='sm'>{t('authent_overviewpage.access_package_resources')}</Label>
            <div>
              {accessPackage.resources.map((resource) => {
                return (
                  <ActionBar
                    key={resource.identifier}
                    title={resource.title?.[currentLanguage]}
                    icon={resource.logoUrl && <RightsListLogo logoUrl={resource.logoUrl} />}
                    subtitle={resource?.hasCompetentAuthority?.name?.[currentLanguage]}
                    color='transparent'
                    size='small'
                  />
                );
              })}
            </div>
          </ActionBar>
        );
      })}
    </>
  );
};
