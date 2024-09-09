import { useTranslation } from 'react-i18next';
import React from 'react';
import { Page } from '@/components';
import ApiIcon from '@/assets/Api.svg?react';
import { VendorCreationPageContent } from './VendorCreationPageContent';
import AltinnLogo from '@/assets/AltinnTextLogo.svg?react';
import classes from './VendorCreationPageContent.module.css';
import { VendorSystem } from '@/types';

export const VendorCreationPage = () => {
  const { t } = useTranslation();

  const system = {
    systemId: 'fiken_demo_product',
    systemVendorOrgNumber: '913312465',
    systemVendorOrgName: 'Fiken AS',
    systemName: 'Fiken regnskap',
    rights: [
      {
        resource: [
          {
            id: 'urn:altinn:resource',
            value: 'ske-innrapportering-boligselskap',
          },
        ],
        serviceResource: {
          identifier: 'ske-innrapportering-boligselskap',
          version: '1',
          title: {
            en: 'Submission Housing company',
            nb: 'Innrapportering Boligselskap',
            nn: 'Innrapportering Bustadselskap',
          },
          description: {
            en: "The housing company must submit information to the Directorate of Taxes about the unit owner/shareholder's share of any income, expenses, assets and liabilities. Usually the housing company’s manager submits the information.",
            nb: 'Boligselskap skal levere opplysninger til Skattedirektoratet om andelshavers/aksjonærs andel av inntekter, utgifter, formue og gjeld. Det er vanligvis boligselskapets forretningsfører som leverer opplysningene.',
            nn: 'Boligselskap skal levere opplysninger til Skattedirektoratet om andelshavers/aksjonærs andel av inntekter, utgifter, formue og gjeld. Det er vanligvis boligselskapets forretningsfører som leverer opplysningene.',
          },
          rightDescription: {
            en: 'Provide access to others to use the form for submitting information on Housing company on behalf of yourself',
            nb: 'Delegering av denne tjenesten gir andre mulighet til å rapportere opplysninger om boligsameie på vegne av deg.',
            nn: 'Delegering av denne tjenesten gir andre mulighet til å rapportere opplysninger om bustadselskap på vegne av deg.',
          },
          homepage: null,
          status: 'Completed',
          contactPoints: [
            {
              category: 'Innrapportering',
              email: '',
              telephone: '',
              contactPage: 'www.skatteetaten.no',
            },
          ],
          resourceReferences: null,
          delegable: true,
          visible: true,
          hasCompetentAuthority: {
            organization: '974761076',
            orgcode: 'skd',
            name: {
              en: 'Norwegian Tax Administration',
              nb: 'Skatteetaten',
              nn: 'Skatteetaten',
            },
          },
          keywords: [
            {
              word: 'Boligselskap',
              language: 'nb',
            },
            {
              word: 'innrapportering',
              language: 'nb',
            },
          ],
          limitedByRRR: false,
          selfIdentifiedUserEnabled: false,
          enterpriseUserEnabled: true,
          resourceType: 'GenericAccessResource',
          availableForType: ['LegalEntityEnterprise'],
          authorizationReference: null,
        },
      },
      {
        resource: [
          {
            id: 'urn:altinn:resource',
            value: 'ttd-am-k6-nuf',
          },
        ],
        serviceResource: {
          identifier: 'ttd-am-k6-nuf',
          version: '1',
          title: {
            en: 'Maskinporten Schema - AM - K6 - NUF',
            nb: 'Maskinporten Schema - AM - K6 - NUF',
            nn: 'Maskinporten Schema - AM - K6 - NUF',
          },
          description: {
            en: 'Maskinporten Schema test resource for NUF, used for automated tests',
            nb: 'Maskinporten Schema test resource for NUF, brukt for automatiserte tester',
            nn: 'Maskinporten Schema test resource for NUF, nytta for automatiserte testar',
          },
          rightDescription: {
            en: 'Access to the test scopes for NUF',
            nb: 'Tilgang til test scopene for NUF',
            nn: 'Tilgong til test omfang for NUF',
          },
          homepage: 'https://www.digdir.no/',
          status: 'Completed',
          contactPoints: [],
          resourceReferences: [
            {
              referenceSource: 'ExternalPlatform',
              reference: 'test:am/k6nuf.read',
              referenceType: 'MaskinportenScope',
            },
            {
              referenceSource: 'ExternalPlatform',
              reference: 'test:am/k6nuf.write',
              referenceType: 'MaskinportenScope',
            },
          ],
          delegable: true,
          visible: true,
          hasCompetentAuthority: {
            organization: '991825827',
            orgcode: 'TTD',
            name: {
              en: 'Test departement',
              nb: 'Testdepartement',
              nn: 'Testdepartement',
            },
          },
          keywords: [],
          limitedByRRR: false,
          selfIdentifiedUserEnabled: false,
          enterpriseUserEnabled: false,
          resourceType: 'MaskinportenSchema',
          availableForType: [],
        },
      },
    ],
    softDeleted: false,
    clientId: ['781b0855-f7ac-4d16-910d-5926fcc46a9f'],
    isVisible: true,
  } as VendorSystem;

  return (
    <div className={classes.vendorCreationWrapper}>
      <div className={classes.vendorCreationHeader}>
        <AltinnLogo />
        <div>
          <div>{system.systemVendorOrgName}</div>
          <div>
            {t('vendor_creation.org_nr')} {system.systemVendorOrgNumber.match(/.{1,3}/g)?.join(' ')}
          </div>
        </div>
      </div>
      <Page
        color='light'
        icon={<ApiIcon />}
        title={t('vendor_creation.banner_title')}
        smallContentPadding
      >
        <VendorCreationPageContent system={system} />
      </Page>
    </div>
  );
};
