import { ServiceResource } from './serviceResource';

export interface SystemRight {
  resource: {
    id: string;
    value: string;
  }[];
  serviceResource: ServiceResource;
}
