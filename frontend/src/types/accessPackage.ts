import { SupportedLanguage } from './language';
import { ServiceResource } from './serviceResource';

export interface AccessPackage {
  id: string;
  urn: string;
  name: SupportedLanguage;
  description: SupportedLanguage;
  area?: {
    id: string;
    name: string;
    description: string;
    iconName: string;
    shortDescription: string;
  };
  resources: ServiceResource[];
}
