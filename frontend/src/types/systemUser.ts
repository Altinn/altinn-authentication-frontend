import { ServiceResource } from './serviceResource';
import { SystemRight } from './systemRight';

export interface SystemUser {
  id: string;
  integrationTitle: string;
  description: string;
  systemId: string;
  supplierName: string;
  supplierOrgno: string;
  ownedByPartyId: string;
  created: string;
  rights: SystemRight[];
  resources: ServiceResource[];
}
