import { SystemRight } from './systemRight';

export interface VendorSystem {
  systemId: string;
  systemVendorOrgName: string;
  systemVendorOrgNumber: string;
  systemName: string;
  description: string;
  rights: SystemRight[];
  softDeleted: boolean;
  isVisible: boolean;
}
