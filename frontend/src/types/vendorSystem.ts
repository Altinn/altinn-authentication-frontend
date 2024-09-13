import { SystemRight } from './systemRight';

export interface VendorSystem {
  systemId: string;
  systemVendorOrgName: string;
  systemVendorOrgNumber: string;
  systemName: {
    nb: string;
    nn: string;
    en: string;
  };
  description?: {
    nb: string;
    nn: string;
    en: string;
  };
  rights: SystemRight[];
  softDeleted: boolean;
  isVisible: boolean;
}
