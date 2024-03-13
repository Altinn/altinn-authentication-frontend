export interface SystemRight {
  right: string;
  serviceProvider: string;
  actions?: { name: string; on: boolean }[];
}
