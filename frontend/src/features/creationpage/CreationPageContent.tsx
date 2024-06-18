import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Heading, Combobox, Alert, Paragraph } from '@digdir/designsystemet-react';
import { AuthenticationRoute } from '@/routes/paths';
import classes from './CreationPageContent.module.css';
import { useGetVendorsQuery } from '@/rtk/features/systemUserApi';
import { useAppDispatch, useAppSelector } from '@/rtk/app/hooks';
import { setSelectedSystemType } from '@/rtk/features/createSystemUserSlice';

export const CreationPageContent = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { integrationTitle, selectedSystemType } = useAppSelector(
    (state) => state.createSystemUser,
  );

  const { data: vendors, isError: isLoadVendorError } = useGetVendorsQuery();

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(AuthenticationRoute.Overview);
  };

  const handleConfirm = () => {
    navigate(AuthenticationRoute.RightsIncluded);
  };

  return (
    <div className={classes.creationPageContainer}>
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
          placeholder={t('common.choose')}
          onValueChange={(newValue: string[]) => {
            if (newValue?.length) {
              const system = vendors?.find((x) => x.systemId === newValue[0]);
              dispatch(
                setSelectedSystemType({
                  systemId: newValue[0],
                  friendlySystemName: system?.systemName ?? '',
                }),
              );
            }
          }}
          value={selectedSystemType ? [selectedSystemType] : undefined}
        >
          {vendors?.map((vendor) => {
            return (
              <Combobox.Option
                key={vendor.systemId}
                value={vendor.systemId}
                description={vendor.systemVendorOrgName}
              >
                {vendor.systemName}
              </Combobox.Option>
            );
          })}
        </Combobox>
        {isLoadVendorError && (
          <Alert severity='danger'>{t('authent_creationpage.load_vendors_error')}</Alert>
        )}
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
          {t('common.cancel')}
        </Button>
      </div>
    </div>
  );
};
