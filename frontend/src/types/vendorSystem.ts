import { SystemRight } from './systemRight';

export interface VendorSystem {
  systemTypeId: string;
  systemVendor: string;
  friendlyProductName: string;
  defaultRights: SystemRight[];
}
