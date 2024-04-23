import { SystemRight } from './systemRight';

export interface VendorSystem {
  systemTypeId: string;
  systemVendor: string;
  description: string;
  defaultRights: SystemRight[];
}
