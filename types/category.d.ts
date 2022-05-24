interface Category {
	id: number;
	attributes: {
		name: string;
		slug: string;
		description?: string;
		createdAt: Date;
		updatedAt: Date;
	};
}
