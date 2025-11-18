import i18next from 'i18next';
import '../i18n';

export type SupportedLanguage = 'en' | 'hi';

export const setLocale = (lng: SupportedLanguage) => {
  if (i18next.language !== lng) {
    i18next.changeLanguage(lng);
  }
};

export default i18next;
