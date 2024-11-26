// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

const systemUsers = [
  {
    id: 'ecfd59bb-0e8f-453d-ab56-6d6f69ec76d7',
    integrationTitle: 'Testdepartement',
    systemId: 'ttd_demo_product2',
    systemInternalId: '3101efb8-79ef-4cf2-aaa6-2a4cdc7f665b',
    partyId: '51570770',
    reporteeOrgNo: '310519472',
    created: '2024-10-15T08:08:18.029959Z',
    isDeleted: false,
    supplierName: 'SØRE OSEN OG STORDAL',
    supplierOrgno: '910419560',
    rights: [],
    resources: [
      {
        identifier: 'nav-og-betalinger',
        version: '1',
        title: {
          en: 'Nav og betalinger',
          nb: 'Nav og betalinger',
          nn: 'Nav og betalinger',
        },
        description: {
          en: 'Ressurs for å styre tilgang til Nav og betalinger',
          nb: 'Ressurs for å styre tilgang til Nav og betalinger',
          nn: 'Ressurs for å styre tilgang til Nav og betalinger',
        },
        rightDescription: {
          en: 'Gir tilgang til Nav og betalinger',
          nb: 'Gir tilgang til Nav og betalinger',
          nn: 'Gir tilgang til Nav og betalinger',
        },
        homepage: 'https://skatteetaten.github.io/api-dokumentasjon/api/kravogbetalinger',
        status: 'UnderDevelopment',
        spatial: null,
        contactPoints: [
          {
            category: 'Brukerstøtte',
            email: '',
            telephone: '',
            contactPage: 'https://skatteetaten.github.io/api-dokumentasjon/kontaktoss',
          },
        ],
        produces: null,
        isPartOf: null,
        thematicAreas: null,
        resourceReferences: null,
        delegable: true,
        visible: true,
        hasCompetentAuthority: {
          organization: '889640782',
          orgcode: 'nav',
          name: {
            en: 'Norwegian Labour and Welfare Administration (NAV)',
            nb: 'Arbeids- og velferdsetaten (NAV)',
            nn: 'Arbeids- og velferdsetaten (NAV)',
          },
        },
        keywords: [],
        accessListMode: 'Disabled',
        selfIdentifiedUserEnabled: false,
        enterpriseUserEnabled: true,
        resourceType: 'GenericAccessResource',
        availableForType: ['LegalEntityEnterprise'],
        authorizationReference: null,
        logoUrl: 'https://altinncdn.no/orgs/nav/nav.png',
      },
    ],
  },
];
export const handlers = [
  // GET user
  http.get('/authfront/api/v1/profile/user', () => {
    return HttpResponse.json({
      loggedInPersonName: 'OLA NORMANN',
      representingPartyName: 'RØRLEGGER HANSEN AS',
      canCreateSystemUser: true,
    });
  }),

  // GET list of systemusers
  http.get('/authfront/api/v1/systemuser', () => {
    return HttpResponse.json(systemUsers);
  }),

  // GET single systemuser
  http.get('/authfront/api/v1/systemuser/:id', () => {
    return HttpResponse.json(systemUsers[0]);
  }),

  // DELETE single systemuser
  http.delete('/authfront/api/v1/systemuser/:systemuserid', () => {
    systemUsers.splice(0, 1);
    return new HttpResponse(null, {
      status: 204,
    });
  }),

  // GET list of systems
  http.get('/authfront/api/v1/systemregister', () => {
    return HttpResponse.json([
      {
        systemId: 'ttd_demo_product2',
        systemVendorOrgNumber: '910419560',
        systemVendorOrgName: 'SØRE OSEN OG STORDAL',
        name: {
          en: 'Testdepartement',
          nb: 'Testdepartement',
          nn: 'Testdepartement',
        },
        description: {
          en: 'Testdepartement',
          nb: 'Testdepartement',
          nn: 'Testdepartement',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      {
        systemId: 'unimicro_demo_product',
        systemVendorOrgNumber: '925141623',
        systemVendorOrgName: 'N/A',
        name: {
          en: 'Unimicro',
          nb: 'Unimicro',
          nn: 'Unimicro',
        },
        description: {
          en: 'Unimicro',
          nb: 'Unimicro',
          nn: 'Unimicro',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      {
        systemId: 'sindig_oriental_tiger_client',
        systemVendorOrgNumber: '312600757',
        systemVendorOrgName: 'SINDIG ORIENTAL TIGER AS',
        name: {
          en: 'Sindig Oriental',
          nb: 'Sindig Oriental',
          nn: 'Sindig Oriental',
        },
        description: {
          en: 'Sindig Oriental',
          nb: 'Sindig Oriental',
          nn: 'Sindig Oriental',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'systembrukerapitest',
              },
            ],
          },
        ],
      },
      {
        systemId: 'unimicro_test',
        systemVendorOrgNumber: '925141623',
        systemVendorOrgName: 'N/A',
        name: {
          en: 'Unimicro Test',
          nb: 'Unimicro Test',
          nn: 'Unimicro Test',
        },
        description: {
          en: 'Unimicro Test',
          nb: 'Unimicro Test',
          nn: 'Unimicro Test',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      {
        systemId: 'fiken_demo_product',
        systemVendorOrgNumber: '913312465',
        systemVendorOrgName: 'FIKEN AS',
        name: {
          en: 'Fiken',
          nb: 'Fiken',
          nn: 'Fiken',
        },
        description: {
          en: 'Fiken',
          nb: 'Fiken',
          nn: 'Fiken',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      {
        systemId: 'tripletex_demo_product',
        systemVendorOrgNumber: '914286018',
        systemVendorOrgName: 'N/A',
        name: {
          en: 'Tripletex',
          nb: 'Tripletex',
          nn: 'Tripletex',
        },
        description: {
          en: 'Tripletex',
          nb: 'Tripletex',
          nn: 'Tripletex',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      {
        systemId: '997752767_smartregnskap',
        systemVendorOrgNumber: '997752767',
        systemVendorOrgName: 'N/A',
        name: {
          en: 'Smartregnskap',
          nb: 'Smartregnskap',
          nn: 'Smartregnskap',
        },
        description: {
          en: 'Smartregnskap',
          nb: 'Smartregnskap',
          nn: 'Smartregnskap',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      {
        systemId: 'ttd_demo_product3',
        systemVendorOrgNumber: '910419560',
        systemVendorOrgName: 'SØRE OSEN OG STORDAL',
        name: {
          en: 'Testdepartement',
          nb: 'Testdepartement',
          nn: 'Testdepartement',
        },
        description: {
          en: 'Testdepartement',
          nb: 'Testdepartement',
          nn: 'Testdepartement',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      {
        systemId: '991825827_altinn-broker-system-test',
        systemVendorOrgNumber: '991825827',
        systemVendorOrgName: 'DIGITALISERINGSDIREKTORATET',
        name: {
          en: 'Altinn Broker System',
          nb: 'Altinn Broker System',
          nn: 'Altinn Broker System',
        },
        description: {
          en: 'Altinn Broker System',
          nb: 'Altinn Broker System',
          nn: 'Altinn Broker System',
        },
        rights: [],
      },
      {
        systemId: 'lucalabs_demo_product',
        systemVendorOrgNumber: '918098372',
        systemVendorOrgName: 'N/A',
        name: {
          en: 'Luca Regnskap',
          nb: 'Luca Regnskap',
          nn: 'Luca Regnskap',
        },
        description: {
          en: 'Luca Regnskap',
          nb: 'Luca Regnskap',
          nn: 'Luca Regnskap',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      {
        systemId: 'matrix_mp_test',
        systemVendorOrgNumber: '314330897',
        systemVendorOrgName: 'SKÅNSOM AUTONOM STRUTS',
        name: {
          en: 'The Matrix',
          nb: 'The Matrix',
          nn: 'The Matrix',
        },
        description: {
          en: 'The Matrix',
          nb: 'The Matrix',
          nn: 'The Matrix',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      {
        systemId: '991825827_smartcloud',
        systemVendorOrgNumber: '991825827',
        systemVendorOrgName: 'DIGITALISERINGSDIREKTORATET',
        name: {
          en: 'SmartCloud',
          nb: 'SmartCloud',
          nn: 'Smart SKY',
        },
        description: {
          en: 'SmartCloud Rocks',
          nb: 'SmartCloud er verdens beste system.',
          nn: 'SmartSky er vestlandes beste system',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      {
        systemId: '913312465_fiken_as',
        systemVendorOrgNumber: '913312465',
        systemVendorOrgName: 'FIKEN AS',
        name: {
          en: 'Fiken accounting software',
          nb: 'Fiken regnskapsprogram',
          nn: 'Fiken regnskapsprogram',
        },
        description: {
          en: 'Fiken accounting software',
          nb: 'Fiken regnskapsprogram',
          nn: 'Fiken regnskapsprogram',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      {
        systemId: '974761076_skatt_demo_system',
        systemVendorOrgNumber: '974761076',
        systemVendorOrgName: 'SKATTEETATEN',
        name: {
          en: 'Skatteetatens Test SBS',
          nb: 'Skatteetatens Test SBS',
          nn: 'Skatteetatens Test SBS',
        },
        description: {
          en: 'Skatteetatens Test SBS',
          nb: 'Skatteetatens Test SBS',
          nn: 'Skatteetatens Test SBS',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-innrapportering-boligselskap',
              },
            ],
          },
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-innrapportering-boligsameie',
              },
            ],
          },
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-innrapportering-gaver-frivillige-organisasjoner',
              },
            ],
          },
        ],
      },
      {
        systemId: '933646920_visma_periode',
        systemVendorOrgNumber: '933646920',
        systemVendorOrgName: 'VISMA SOFTWARE AS',
        name: {
          en: 'Visma Periods & Year',
          nb: 'Visma Periode & År',
          nn: 'Visma Periode & År',
        },
        description: {
          en: 'Visma Periods & Year',
          nb: 'Visma Periode & År',
          nn: 'Visma Periode & År',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-innrapportering-boligselskap',
              },
            ],
          },
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-innrapportering-boligsameie',
              },
            ],
          },
        ],
      },
    ]);
  }),

  // GET rights of system
  http.get('/authfront/api/v1/systemregister/rights/:systemId', () => {
    return HttpResponse.json([
      {
        identifier: 'ske-krav-og-betalinger',
        version: '1',
        title: {
          en: 'Krav og betalinger',
          nb: 'Krav og betalinger',
          nn: 'Krav og betalinger',
        },
        description: {
          en: 'Ressurs for å styre tilgang til Krav og betalinger',
          nb: 'Ressurs for å styre tilgang til Krav og betalinger',
          nn: 'Ressurs for å styre tilgang til Krav og betalinger',
        },
        rightDescription: {
          en: 'Gir tilgang til Krav og betalinger',
          nb: 'Gir tilgang til Krav og betalinger',
          nn: 'Gir tilgang til Krav og betalinger',
        },
        homepage: 'https://skatteetaten.github.io/api-dokumentasjon/api/kravogbetalinger',
        status: 'UnderDevelopment',
        spatial: null,
        contactPoints: [
          {
            category: 'Brukerstøtte',
            email: '',
            telephone: '',
            contactPage: 'https://skatteetaten.github.io/api-dokumentasjon/kontaktoss',
          },
        ],
        produces: null,
        isPartOf: null,
        thematicAreas: null,
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
        keywords: [],
        accessListMode: 'Disabled',
        selfIdentifiedUserEnabled: false,
        enterpriseUserEnabled: true,
        resourceType: 'GenericAccessResource',
        availableForType: ['LegalEntityEnterprise'],
        authorizationReference: null,
        logoUrl: 'https://altinncdn.no/orgs/skd/skd.png',
      },
    ]);
  }),

  // POST new systemuser
  http.post('/authfront/api/v1/systemuser', () => {
    const newSystemUser = {
      id: 'a3cecdb7-40b7-41a0-8ddd-e418b1abe83e',
      integrationTitle: 'Testdepartement',
      systemId: 'ttd_demo_product2',
      systemInternalId: '3101efb8-79ef-4cf2-aaa6-2a4cdc7f665b',
      partyId: '51562159',
      reporteeOrgNo: '310422649',
      created: '2024-10-15T07:56:09.365248Z',
      isDeleted: false,
      supplierName: 'SØRE OSEN OG STORDAL',
      supplierOrgno: '910419560',
      rights: [],
      resources: [],
    };
    systemUsers.push(newSystemUser);
    return HttpResponse.json(newSystemUser);
  }),

  // GET vendor request
  http.get('/authfront/api/v1/systemuser/request/:requestId', () => {
    return HttpResponse.json({
      id: 'b3da3525-b16d-4a51-9613-fe5d277396a5',
      externalRef: '344b8b40-c386-478c-869d-d93d6f127d17',
      systemId: '991825827_smartcloud',
      system: {
        systemId: '991825827_smartcloud',
        systemVendorOrgNumber: '991825827',
        systemVendorOrgName: 'DIGITALISERINGSDIREKTORATET',
        name: {
          en: 'SmartCloud',
          nb: 'SmartCloud',
          nn: 'Smart SKY',
        },
        description: {
          en: 'SmartCloud Rocks',
          nb: 'SmartCloud er verdens beste system.',
          nn: 'SmartSky er vestlandes beste system',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      partyOrgNo: '314048431',
      rights: [
        {
          action: null,
          resource: [
            {
              id: 'urn:altinn:resource',
              value: 'ske-krav-og-betalinger',
            },
          ],
        },
      ],
      resources: [
        {
          identifier: 'ske-krav-og-betalinger',
          version: '1',
          title: {
            en: 'Krav og betalinger',
            nb: 'Krav og betalinger',
            nn: 'Krav og betalinger',
          },
          description: {
            en: 'Ressurs for å styre tilgang til Krav og betalinger',
            nb: 'Ressurs for å styre tilgang til Krav og betalinger',
            nn: 'Ressurs for å styre tilgang til Krav og betalinger',
          },
          rightDescription: {
            en: 'Gir tilgang til Krav og betalinger',
            nb: 'Gir tilgang til Krav og betalinger',
            nn: 'Gir tilgang til Krav og betalinger',
          },
          homepage: 'https://skatteetaten.github.io/api-dokumentasjon/api/kravogbetalinger',
          status: 'UnderDevelopment',
          spatial: null,
          contactPoints: [
            {
              category: 'Brukerstøtte',
              email: '',
              telephone: '',
              contactPage: 'https://skatteetaten.github.io/api-dokumentasjon/kontaktoss',
            },
          ],
          produces: null,
          isPartOf: null,
          thematicAreas: null,
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
          keywords: [],
          accessListMode: 'Disabled',
          selfIdentifiedUserEnabled: false,
          enterpriseUserEnabled: true,
          resourceType: 'GenericAccessResource',
          availableForType: ['LegalEntityEnterprise'],
          authorizationReference: null,
          logoUrl: 'https://altinncdn.no/orgs/skd/skd.png',
        },
      ],
      status: 'New',
      redirectUrl: 'https://smartcloudaltinn.azurewebsites.net/receipt',
    });
  }),

  // POST approve request
  http.post('/authfront/api/v1/systemuser/request/:requestId/approve', () => {
    return new HttpResponse(null, {
      status: 204,
    });
  }),

  // POST reject request
  http.post('/authfront/api/v1/systemuser/request/:requestId/reject', () => {
    return new HttpResponse(null, {
      status: 204,
    });
  }),

  // GET change request
  http.get('/authfront/api/v1/systemuser/changerequest/:requestId', () => {
    return HttpResponse.json({
      id: 'b3da3525-b16d-4a51-9613-fe5d277396a5',
      externalRef: '344b8b40-c386-478c-869d-d93d6f127d17',
      systemId: '991825827_smartcloud',
      system: {
        systemId: '991825827_smartcloud',
        systemVendorOrgNumber: '991825827',
        systemVendorOrgName: 'DIGITALISERINGSDIREKTORATET',
        name: {
          en: 'SmartCloud',
          nb: 'SmartCloud',
          nn: 'Smart SKY',
        },
        description: {
          en: 'SmartCloud Rocks',
          nb: 'SmartCloud er verdens beste system.',
          nn: 'SmartSky er vestlandes beste system',
        },
        rights: [
          {
            action: null,
            resource: [
              {
                id: 'urn:altinn:resource',
                value: 'ske-krav-og-betalinger',
              },
            ],
          },
        ],
      },
      partyOrgNo: '314048431',
      requiredRights: [
        {
          action: null,
          resource: [
            {
              id: 'urn:altinn:resource',
              value: 'ske-krav-og-betalinger',
            },
          ],
        },
      ],
      unwantedRights: [
        {
          action: null,
          resource: [
            {
              id: 'urn:altinn:resource',
              value: 'ske-krav-og-betalinger',
            },
          ],
        },
      ],
      resourcesAfterChange: [
        {
          identifier: 'ske-krav-og-betalinger',
          version: '1',
          title: {
            en: 'Krav og betalinger',
            nb: 'Krav og betalinger',
            nn: 'Krav og betalinger',
          },
          description: {
            en: 'Ressurs for å styre tilgang til Krav og betalinger',
            nb: 'Ressurs for å styre tilgang til Krav og betalinger',
            nn: 'Ressurs for å styre tilgang til Krav og betalinger',
          },
          rightDescription: {
            en: 'Gir tilgang til Krav og betalinger',
            nb: 'Gir tilgang til Krav og betalinger',
            nn: 'Gir tilgang til Krav og betalinger',
          },
          homepage: 'https://skatteetaten.github.io/api-dokumentasjon/api/kravogbetalinger',
          status: 'UnderDevelopment',
          spatial: null,
          contactPoints: [
            {
              category: 'Brukerstøtte',
              email: '',
              telephone: '',
              contactPage: 'https://skatteetaten.github.io/api-dokumentasjon/kontaktoss',
            },
          ],
          produces: null,
          isPartOf: null,
          thematicAreas: null,
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
          keywords: [],
          accessListMode: 'Disabled',
          selfIdentifiedUserEnabled: false,
          enterpriseUserEnabled: true,
          resourceType: 'GenericAccessResource',
          availableForType: ['LegalEntityEnterprise'],
          authorizationReference: null,
          logoUrl: 'https://altinncdn.no/orgs/skd/skd.png',
        },
        {
          identifier: 'nav-og-betalinger',
          version: '1',
          title: {
            en: 'Nav og betalinger',
            nb: 'Nav og betalinger',
            nn: 'Nav og betalinger',
          },
          description: {
            en: 'Ressurs for å styre tilgang til Nav og betalinger',
            nb: 'Ressurs for å styre tilgang til Nav og betalinger',
            nn: 'Ressurs for å styre tilgang til Nav og betalinger',
          },
          rightDescription: {
            en: 'Gir tilgang til Nav og betalinger',
            nb: 'Gir tilgang til Nav og betalinger',
            nn: 'Gir tilgang til Nav og betalinger',
          },
          homepage: 'https://skatteetaten.github.io/api-dokumentasjon/api/kravogbetalinger',
          status: 'UnderDevelopment',
          spatial: null,
          contactPoints: [
            {
              category: 'Brukerstøtte',
              email: '',
              telephone: '',
              contactPage: 'https://skatteetaten.github.io/api-dokumentasjon/kontaktoss',
            },
          ],
          produces: null,
          isPartOf: null,
          thematicAreas: null,
          resourceReferences: null,
          delegable: true,
          visible: true,
          hasCompetentAuthority: {
            organization: '889640782',
            orgcode: 'nav',
            name: {
              en: 'Norwegian Labour and Welfare Administration (NAV)',
              nb: 'Arbeids- og velferdsetaten (NAV)',
              nn: 'Arbeids- og velferdsetaten (NAV)',
            },
          },
          keywords: [],
          accessListMode: 'Disabled',
          selfIdentifiedUserEnabled: false,
          enterpriseUserEnabled: true,
          resourceType: 'GenericAccessResource',
          availableForType: ['LegalEntityEnterprise'],
          authorizationReference: null,
          logoUrl: 'https://altinncdn.no/orgs/nav/nav.png',
        },
      ],
      status: 'New',
      redirectUrl: 'https://smartcloudaltinn.azurewebsites.net/receipt',
    });
  }),

  // POST approve change request
  http.post('/authfront/api/v1/systemuser/changerequest/:requestId/approve', () => {
    return new HttpResponse(null, {
      status: 204,
    });
  }),

  // POST reject change request
  http.post('/authfront/api/v1/systemuser/changerequest/:requestId/reject', () => {
    return new HttpResponse(null, {
      status: 204,
    });
  }),
];
