interface Category {
	id: number;
	attributes: {
		name: string;
		slug: string;
		description?: string;
		articles?: { data: Article[] };
		createdAt: Date;
		updatedAt: Date;
	};
}
