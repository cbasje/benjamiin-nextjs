interface Homepage {
	id: number;
	attributes: {
		title: string;
		description?: string;
		seo?: Seo;
		locale: string;
	};
}
