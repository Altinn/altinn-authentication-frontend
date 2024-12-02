import { ServiceResource } from './serviceResource';

export interface SystemUser {
  id: string;
  integrationTitle: string;
  systemId: string;
  supplierName: string;
  supplierOrgno: string;
  created: string;
  resources: ServiceResource[];
}
