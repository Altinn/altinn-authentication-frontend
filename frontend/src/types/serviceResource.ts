import { SupportedLanguage, ValidLanguage } from './language';

export interface ServiceResource {
  identifier: string;
  resourceType?: ResourceTypeOption;
  title: SupportedLanguage;
  description?: SupportedLanguage;
  keywords?: ResourceKeyword[];
  homepage?: string;
  visible?: boolean;
  delegable?: boolean;
  rightDescription?: SupportedLanguage;
  version?: string;
  resourceReferences?: ResourceReference[];
  status?: ResourceStatusOption;
  selfIdentifiedUserEnabled?: boolean;
  enterpriseUserEnabled?: boolean;
  availableForType?: ResourceAvailableForTypeOption[];
  contactPoints?: ResourceContactPoint[];
  accessListMode?: string;
  hasCompetentAuthority?: {
    organization?: string;
    orgcode?: string;
    name?: SupportedLanguage;
  };
  logoUrl?: string;
}

interface ResourceContactPoint {
  category: string;
  email: string;
  telephone: string;
  contactPage: string;
}

type ResourceTypeOption =
  | 'GenericAccessResource'
  | 'Systemresource'
  | 'MaskinportenSchema'
  | 'BrokerService';

type ResourceStatusOption = 'Completed' | 'Deprecated' | 'UnderDevelopment' | 'Withdrawn';

type ResourceAvailableForTypeOption =
  | 'PrivatePerson'
  | 'LegalEntityEnterprise'
  | 'Company'
  | 'BankruptcyEstate'
  | 'SelfRegisteredUser';

interface ResourceKeyword {
  language: ValidLanguage;
  word: string;
}

type ResourceReferenceSource = 'Default' | 'Altinn2' | 'Altinn3' | 'ExternalPlatform';
type ResourceReferenceType =
  | 'Default'
  | 'Uri'
  | 'DelegationSchemeId'
  | 'MaskinportenScope'
  | 'ServiceCode'
  | 'ServiceEditionCode';

interface ResourceReference {
  referenceSource?: ResourceReferenceSource;
  reference?: string;
  referenceType?: ResourceReferenceType;
}
