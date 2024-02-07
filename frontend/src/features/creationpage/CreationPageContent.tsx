import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Textfield, Button, HelpText, Heading, Combobox } from '@digdir/design-system-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './CreationPageContent.module.css';
import { useGetVendorsQuery } from '@/rtk/features/systemUserApi';

export const CreationPageContent = () => {
  // NB! This page now (10.01.24) should go to RightsIncludedPageContent before
  // actually creating a new systemUser, but since the button there returns
  // to OverviewPageContent, in effect the user sees no difference.

  // Local State variables for input-boxes and Nedtrekksmeny:
  const [integrationName, setIntegrationName] = useState('');
  const [selectedSystemType, setSelectedSystemType] = useState('');

  // const [vendorsArrayPopulated, setVendorsArrayPopulated] = useState(false); // not used yet

  const { data: vendors } = useGetVendorsQuery();
  const { t } = useTranslation('common');

  const navigate = useNavigate();

  const handleReject = () => {
    navigate(AuthenticationRoute.Overview);
  };

  const handleConfirm = () => {
    // Clean up local State variables before returning to main page, was old solution
    // update 07.12.23: New Design of 24.11.23 specifies navigation
    // to ConfirmationPage: OK, but if CreationRequest fails we need to
    // notify the user, but perhaps we could do it on the ConfirmationPage?
    setIntegrationName('');
    setSelectedSystemType('');

    // new per 10.01.24: we navigate to RightsIncludedPage
    navigate(AuthenticationRoute.RightsIncluded, {
      state: {
        integrationName: integrationName,
        selectedSystemType: selectedSystemType,
      },
    });
  };

  // Håndterer skifte av valgmuligheter (options) i Nedtrekksmeny
  // Fix-me: Bør sjekke om DesignSystem dokumentasjon er oppdatert
  const handleChangeInput = (val: string) => {
    setSelectedSystemType(val);
  };

  return (
    <div className={classes.creationPageContainer}>
      <div className={classes.inputContainer}>
        <Textfield
          label={
            <div className={classes.nameLabel}>
              <div>{t('authent_creationpage.input_field_label')}</div>
              <HelpText size='small' title='Hjelpetekst for systembrukar'>
                Hjelpetekst for systembrukar
              </HelpText>
            </div>
          }
          value={integrationName}
          onChange={(e) => setIntegrationName(e.target.value)}
        />
      </div>
      <div>
        <Heading level={2} size='small'>
          {t('authent_creationpage.sub_title')}
        </Heading>
        <p className={classes.contentText}>{t('authent_creationpage.content_text1')}</p>
        <p className={classes.contentText}>{t('authent_creationpage.content_text2')}</p>
      </div>
      <div className={classes.inputContainer}>
        <Combobox
          label={t('authent_creationpage.pull_down_menu_label')}
          onValueChange={(newValue: string[]) => {
            if (newValue?.length) {
              handleChangeInput(newValue[0]);
            }
          }}
          value={selectedSystemType ? [selectedSystemType] : undefined}
        >
          {vendors?.map((vendor) => {
            return (
              <Combobox.Option
                key={vendor.systemTypeId}
                value={vendor.systemTypeId}
                description={vendor.description}
              >
                {vendor.systemVendor}
              </Combobox.Option>
            );
          })}
        </Combobox>
      </div>
      <div className={classes.buttonContainer}>
        <Button variant='primary' size='small' onClick={handleConfirm}>
          {t('authent_creationpage.confirm_button')}
        </Button>
        <Button variant='tertiary' size='small' onClick={handleReject}>
          {t('authent_creationpage.cancel_button')}
        </Button>
      </div>
    </div>
  );
};
