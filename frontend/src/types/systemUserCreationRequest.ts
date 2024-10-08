import { ServiceResource } from './serviceResource';
import { SystemRight } from './systemRight';
import { VendorSystem } from './vendorSystem';

type RequestStatus = 'New' | 'Accepted' | 'Rejected' | 'Denied' | 'Timedout';

export interface SystemUserCreationRequest {
  id: string;
  system: VendorSystem;
  systemId: string;
  status: RequestStatus;
  rights: SystemRight[];
  resources: ServiceResource[];
  redirectUrl?: string;
}
