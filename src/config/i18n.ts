import i18n from 'i18n';
import path from 'path';

// Configure i18n
i18n.configure({
  locales: ['en', 'sk'], // Supported languages
  directory: path.join(__dirname, './locales'), // Path to locale files
  defaultLocale: 'en', // Default language
  header: 'language', // HTTP header to determine the language
  autoReload: true, // Reload locale files when they change
  updateFiles: false, // Prevent overwriting locale files
  objectNotation: true, // Enable nested keys in translation files
});

export default i18n;
