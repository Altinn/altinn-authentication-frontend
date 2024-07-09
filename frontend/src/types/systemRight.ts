export interface SystemRight {
  action: string;
  serviceProvider: string;
  resource: {
    id: string;
    value: string;
  }[];
}
