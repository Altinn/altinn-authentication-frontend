import { SystemRight } from './systemRight';
import { VendorSystem } from './vendorSystem';

type RequestStatus = 'new' | 'accepted' | 'rejected' | 'denied';

export interface SystemUserCreationRequest {
  id: string;
  system: VendorSystem;
  systemId: string;
  status: RequestStatus;
  rights: SystemRight[];
  redirectUrl?: string;
}
