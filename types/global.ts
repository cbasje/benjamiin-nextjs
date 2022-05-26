export interface Global {
	id: number;
	attributes: GlobalAttributes;
}

export interface GlobalAttributes {
	siteName: string;
	siteDescription: string;
	favicon: {
		data?: Picture;
	};
	defaultSeo: Seo;
	locale: string;
}
