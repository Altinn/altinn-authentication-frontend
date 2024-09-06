import { ServiceResource } from './serviceResource';

export interface SystemRight {
  delegationResponseData?: {
    rightKey: string;
    resource: {
      id: string;
      value: string;
    }[];
    action?: string;
    status?: string;
  };
  serviceResource: ServiceResource;
}
