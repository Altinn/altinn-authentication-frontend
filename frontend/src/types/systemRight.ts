export interface SystemRight {
  actionRight: string;
  serviceProvider: string;
  resources: {
    id: string;
    value: string;
  }[];
}
