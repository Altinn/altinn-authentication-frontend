import { ServiceResource } from './serviceResource';
import { SystemRight } from './systemRight';
import { VendorSystem } from './vendorSystem';

type RequestStatus = 'New' | 'Accepted' | 'Rejected' | 'Denied' | 'Timedout';

export interface ChangeRequest {
  id: string;
  system: VendorSystem;
  systemId: string;
  status: RequestStatus;
  requiredRights: SystemRight[];
  unwantedRights: SystemRight[];
  resourcesAfterChange: ServiceResource[];
  redirectUrl?: string;
}
