import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Combobox, Alert } from '@digdir/designsystemet-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './CreationPageContent.module.css';
import { useGetVendorsQuery } from '@/rtk/features/systemUserApi';
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';
import { ButtonRow } from '@/components/ButtonRow';
import { PageDescription } from '@/components/PageDescription';
import { RightsIncludedPageContent } from './RightsIncludedPageContent';

const isStringMatch = (inputString: string, matchString = ''): boolean => {
  return matchString.toLowerCase().indexOf(inputString.toLowerCase()) >= 0;
};

export const CreationPageContent = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18nLanguageToShortLanguageCode(i18n.language);

  const [selectedSystemId, setSelectedSystemId] = useState<string>('');
  const [isConfirmStep, setIsConfirmStep] = useState<boolean>(false);

  const {
    data: vendors,
    isLoading: isLoadingVendors,
    isError: isLoadVendorError,
  } = useGetVendorsQuery();

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(AuthenticationRoute.Overview);
  };

  const handleConfirm = () => {
    setIsConfirmStep(true);
  };

  if (isConfirmStep) {
    const selectedSystem = vendors?.find((system) => system.systemId === selectedSystemId);
    return (
      <RightsIncludedPageContent
        selectedSystemId={selectedSystemId}
        integrationTitle={selectedSystem?.name[currentLanguage] ?? ''}
      />
    );
  }

  return (
    <div className={classes.creationPageContainer}>
      <PageDescription
        heading={t('authent_creationpage.sub_title')}
        ingress={t('authent_creationpage.content_text1')}
      />
      <div className={classes.inputContainer}>
        <Combobox
          label={t('authent_creationpage.pull_down_menu_label')}
          loading={isLoadingVendors}
          loadingLabel={t('authent_creationpage.loading_systems')}
          placeholder={t('common.choose')}
          value={selectedSystemId ? [selectedSystemId] : undefined}
          onValueChange={(newValue: string[]) => setSelectedSystemId(newValue[0])}
          filter={(inputValue: string, { label, description }) => {
            const isLabelMatch = isStringMatch(inputValue, label);
            const isDescriptionMatch = isStringMatch(inputValue, description);
            return isLabelMatch || isDescriptionMatch;
          }}
        >
          {vendors?.map((vendor) => {
            return (
              <Combobox.Option
                key={vendor.systemId}
                value={vendor.systemId}
                description={`${vendor.systemVendorOrgName} (${vendor.systemVendorOrgNumber})`}
              >
                {vendor.name[currentLanguage]}
              </Combobox.Option>
            );
          })}
        </Combobox>
        {isLoadVendorError && (
          <Alert data-color='danger'>{t('authent_creationpage.load_vendors_error')}</Alert>
        )}
      </div>
      <ButtonRow>
        <Button
          variant='primary'
          data-size='sm'
          onClick={handleConfirm}
          disabled={!selectedSystemId}
        >
          {t('authent_creationpage.confirm_button')}
        </Button>
        <Button variant='tertiary' data-size='sm' onClick={handleCancel}>
          {t('common.cancel')}
        </Button>
      </ButtonRow>
    </div>
  );
};
