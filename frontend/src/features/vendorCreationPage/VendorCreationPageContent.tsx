import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Heading, Paragraph } from '@digdir/designsystemet-react';
import classes from './VendorCreationPageContent.module.css';
import { RightsList } from '@/components/RightsList/RightsList';
import { VendorSystem } from '@/types';

interface VendorCreationPageContentProps {
  system: VendorSystem;
}

export const VendorCreationPageContent = ({ system }: VendorCreationPageContentProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes.vendorCreationContainer}>
      <Heading level={2} size='sm'>
        {t('vendor_creation.creation_header', {
          vendorName: system.systemVendorOrgName,
        })}
      </Heading>
      <Paragraph>
        <Trans
          i18nKey={'vendor_creation.system_description'}
          values={{ systemName: system.systemName }}
        ></Trans>
      </Paragraph>
      <div>
        <Heading level={3} size='xs'>
          {t('vendor_creation.rights_list_header')}
        </Heading>
        <RightsList rights={system.rights} />
      </div>
      <Paragraph>{t('vendor_creation.included_rights_description')}</Paragraph>
      <div className={classes.buttonRow}>
        <Button variant='primary'>{t('vendor_creation.accept')}</Button>
        <Button variant='tertiary'>{t('vendor_creation.reject')}</Button>
      </div>
    </div>
  );
};
