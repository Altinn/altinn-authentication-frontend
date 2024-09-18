import { SystemRight } from './systemRight';

export interface VendorSystem {
  systemId: string;
  systemVendorOrgName: string;
  systemVendorOrgNumber: string;
  name: {
    nb: string;
    nn: string;
    en: string;
  };
  rights: SystemRight[];
  softDeleted: boolean;
  isVisible: boolean;
}
