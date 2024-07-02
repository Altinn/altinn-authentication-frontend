import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Button, Heading, List, Paragraph } from '@digdir/designsystemet-react';
import classes from './VendorCreationPageContent.module.css';

const system = {
  systemId: 'fiken_demo_product',
  systemVendorOrgNumber: '913312465',
  systemVendorOrgName: 'Fiken',
  systemName: 'Fiken regnskap',
  rights: [
    {
      actionRight: null,
      resources: [
        {
          id: 'urn:altinn:resource',
          value: 'MVA rapportering',
        },
        {
          id: 'urn:altinn:resource',
          value: 'Årsregnskap',
        },
      ],
      serviceProvider: 'Skatteetaten',
    },
  ],
  softDeleted: false,
  clientId: ['781b0855-f7ac-4d16-910d-5926fcc46a9f'],
  isVisible: true,
};

export const VendorCreationPageContent = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.vendorCreationContainer}>
      <Heading level={2} size='sm'>
        {t('vendor_creation.creation_header', { vendorName: system.systemVendorOrgName })}
      </Heading>
      <Paragraph>
        <Trans
          i18nKey={'vendor_creation.system_description'}
          values={{ systemName: system.systemName }}
        ></Trans>
      </Paragraph>
      <List.Root size='md'>
        <List.Heading level={3}>{t('vendor_creation.rights_list_header')}</List.Heading>
        <List.Unordered>
          {system.rights
            .flatMap((right) => right.resources)
            .map((resource) => {
              return <List.Item key={resource.value}>{resource.value}</List.Item>;
            })}
        </List.Unordered>
      </List.Root>
      <Paragraph>{t('vendor_creation.included_rights_description')}</Paragraph>
      <div className={classes.buttonRow}>
        <Button variant='primary'>{t('vendor_creation.accept')}</Button>
        <Button variant='tertiary'>{t('vendor_creation.reject')}</Button>
      </div>
    </div>
  );
};
