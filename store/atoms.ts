import { atom } from 'recoil';

import { GlobalAttributes as GlobalAttributesType } from '@/models/global';

export const globalState = atom<GlobalAttributesType>({
	key: 'globalState',
	default: {
		siteName: '',
		siteDescription: '',
		defaultSeo: {
			metaTitle: '',
			metaDescription: '',
			shareImage: { data: undefined },
			isArticle: false,
			locale: 'en',
		},
	},
});
