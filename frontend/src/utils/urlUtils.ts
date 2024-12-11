export const getApiBaseUrl = (): string => {
  return '/authfront/api/v1/';
};

export const url = (strings: readonly string[], ...values: readonly string[]): string => {
  let result = strings[0];
  for (let i = 1; i < strings.length; i++) {
    result += encodeURIComponent(values[i - 1]);
    result += strings[i];
  }

  return result;
};

export const getHostUrl = (): string => {
  return window.location.hostname.replace('authn.ui.', '');
};

export const getLogoutUrl = (): string => {
  return `https://${getHostUrl()}/ui/Authentication/Logout`;
};
