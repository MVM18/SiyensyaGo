import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/locales/en/common.json';
import fil from '../assets/locales/fil/common.json';

if (!i18n.isInitialized) {
	// Initialize i18n with English and Filipino resources
	const primaryTag = (getLocales()[0]?.languageTag || 'en').toLowerCase();
	const isFilipino = primaryTag.startsWith('fil') || primaryTag.startsWith('tl');

	i18n
		.use(initReactI18next)
		.init({
			compatibilityJSON: 'v4',
			resources: { en: { translation: en }, fil: { translation: fil } },
			lng: isFilipino ? 'fil' : 'en',
			fallbackLng: 'en',
			interpolation: { escapeValue: false },
		});
}

export default i18n; 
