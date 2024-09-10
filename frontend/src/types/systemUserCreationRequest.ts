import { SystemRight } from './systemRight';
import { VendorSystem } from './vendorSystem';

export interface SystemUserCreationRequest {
  requestId: string;
  system: VendorSystem;
  status: string;
  singleRights: SystemRight[];
  redirectUrl?: string;
}
