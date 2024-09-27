import { ServiceResource } from './serviceResource';
import { VendorSystem } from './vendorSystem';

export interface SystemUser {
  id: string;
  integrationTitle: string;
  description: string;
  systemId: string;
  created: string;
  system: VendorSystem;
  resources: ServiceResource[];
}
