import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './locales';  // Import all translations

// Initializing i18next
i18n
  .use(initReactI18next)  // Connecting React with i18next
  .init({
    resources: translations,  // Using translations from the imported 'locales' folder
    interpolation: {
      escapeValue: false,     // React already escapes values, so no need to escape them here
    },
  });

export default i18n;  // Export the i18n instance for use in the rest of the app