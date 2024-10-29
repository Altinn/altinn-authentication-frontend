import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Heading, Combobox, Alert, Paragraph } from '@digdir/designsystemet-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './CreationPageContent.module.css';
import { useGetVendorsQuery } from '@/rtk/features/systemUserApi';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { setSelectedSystemId } from '@/rtk/features/createSystemUserSlice';
import { i18nLanguageToShortLanguageCode } from '@/utils/languageUtils';

export const CreationPageContent = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18nLanguageToShortLanguageCode(i18n.language);

  const dispatch = useAppDispatch();

  const { integrationTitle, selectedSystemId } = useAppSelector((state) => state.createSystemUser);

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
    navigate(AuthenticationRoute.RightsIncluded);
  };

  const isStringMatch = (inputString: string, matchString: string): boolean => {
    return matchString.toLowerCase().indexOf(inputString.toLowerCase()) >= 0;
  };

  return (
    <div className={classes.creationPageContainer}>
      <div>
        <Heading level={2} size='sm' spacing>
          {t('authent_creationpage.sub_title')}
        </Heading>
        <Paragraph size='sm' spacing>
          {t('authent_creationpage.content_text1')}
        </Paragraph>
      </div>
      <div className={classes.inputContainer}>
        <Combobox
          label={t('authent_creationpage.pull_down_menu_label')}
          loading={isLoadingVendors}
          loadingLabel={t('authent_creationpage.loading_systems')}
          placeholder={t('common.choose')}
          onValueChange={(newValue: string[]) => {
            if (newValue?.length) {
              const system = vendors?.find((x) => x.systemId === newValue[0]);
              dispatch(
                setSelectedSystemId({
                  systemId: newValue[0],
                  friendlySystemName: system?.name[currentLanguage] ?? '',
                }),
              );
            }
          }}
          filter={(inputValue: string, option) => {
            const vendor = vendors?.find((x) => x.systemId === option.value);
            if (!vendor) {
              return false;
            }
            const isOrgNrMatch = isStringMatch(inputValue, vendor.systemVendorOrgNumber);
            const isOrgNameMatch = isStringMatch(inputValue, vendor.systemVendorOrgName);
            const isSystemNameMatch = isStringMatch(inputValue, vendor.name[currentLanguage]);
            return isOrgNrMatch || isOrgNameMatch || isSystemNameMatch;
          }}
          value={selectedSystemId ? [selectedSystemId] : undefined}
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
          <Alert color='danger'>{t('authent_creationpage.load_vendors_error')}</Alert>
        )}
      </div>
      <div className={classes.buttonContainer}>
        <Button
          variant='primary'
          size='sm'
          onClick={handleConfirm}
          disabled={!integrationTitle.trim() || !selectedSystemId}
        >
          {t('authent_creationpage.confirm_button')}
        </Button>
        <Button variant='tertiary' size='sm' onClick={handleCancel}>
          {t('common.cancel')}
        </Button>
      </div>
    </div>
  );
};
