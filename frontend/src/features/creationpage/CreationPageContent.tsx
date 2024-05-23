import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Textfield,
  Button,
  Heading,
  Combobox,
  Alert,
  Paragraph,
} from '@digdir/designsystemet-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './CreationPageContent.module.css';
import { useGetVendorsQuery } from '@/rtk/features/systemUserApi';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { setCreateValues } from '@/rtk/features/createSystemUserSlice';

export const CreationPageContent = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const createValues = useAppSelector((state) => state.createSystemUser);
  const [integrationTitle, setIntegrationTitle] = useState<string>(
    createValues.integrationTitle ?? '',
  );
  const [selectedSystemType, setSelectedSystemType] = useState<string>(
    createValues.selectedSystemType ?? '',
  );

  const { data: vendors, isError: isLoadVendorError } = useGetVendorsQuery();

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(AuthenticationRoute.Overview);
  };

  const handleConfirm = () => {
    dispatch(
      setCreateValues({
        integrationTitle: integrationTitle,
        selectedSystemType: selectedSystemType,
      }),
    );
    navigate(AuthenticationRoute.RightsIncluded);
  };

  return (
    <div className={classes.creationPageContainer}>
      <div className={classes.inputContainer}>
        <Textfield
          label={t('authent_creationpage.input_field_label')}
          value={integrationTitle}
          onChange={(e) => setIntegrationTitle(e.target.value)}
        />
      </div>
      <div>
        <Heading level={2} size='small' spacing>
          {t('authent_creationpage.sub_title')}
        </Heading>
        <Paragraph size='small' spacing>
          {t('authent_creationpage.content_text1')}
        </Paragraph>
      </div>
      <div className={classes.inputContainer}>
        <Combobox
          label={t('authent_creationpage.pull_down_menu_label')}
          placeholder='Velg ...'
          onValueChange={(newValue: string[]) => {
            if (newValue?.length) {
              setSelectedSystemType(newValue[0]);
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
        {isLoadVendorError && <Alert severity='danger'>Kunne ikke laste systemleverandører</Alert>}
      </div>
      <div className={classes.buttonContainer}>
        <Button
          variant='primary'
          size='small'
          onClick={handleConfirm}
          disabled={!integrationTitle.trim() || !selectedSystemType}
        >
          {t('authent_creationpage.confirm_button')}
        </Button>
        <Button variant='tertiary' size='small' onClick={handleCancel}>
          {t('authent_creationpage.cancel_button')}
        </Button>
      </div>
    </div>
  );
};
