import { ValidLanguage } from '@/types';

export const i18nLanguageToShortLanguageCode = (i18nLanguage: string): ValidLanguage => {
  if (i18nLanguage === 'en') {
    return 'en';
  } else if (i18nLanguage === 'no_nn') {
    return 'nn';
  }
  return 'nb';
};
