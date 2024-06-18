import { SystemRight } from './systemRight';

export interface VendorSystem {
  systemId: string;
  systemVendorOrgName: string;
  systemName: string;
  rights: SystemRight[];
  softDeleted: boolean;
  isVisible: boolean;
}
