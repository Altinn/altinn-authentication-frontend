import { SystemRight } from './systemRight';
import { VendorSystem } from './vendorSystem';

type RequestStatus = 'new' | 'accepted' | 'rejected' | 'denied';

export interface SystemUserCreationRequest {
  requestId: string;
  system: VendorSystem;
  status: RequestStatus;
  singleRights: SystemRight[];
  redirectUrl?: string;
}
