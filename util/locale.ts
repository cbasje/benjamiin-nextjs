import { Locale } from '@/models/locale';

export const getLocaleLabel = (locale: Locale) => {
	switch (locale) {
		case Locale.EN:
			return '🇬🇧 English';
		case Locale.NL:
			return '🇳🇱 Nederlands';
		default:
			return '';
	}
};
