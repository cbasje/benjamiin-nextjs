interface Article {
	id: number;
	attributes: {
		title: string;
		description: string;
		slug: string;
		image: { data?: Picture };
		category: {
			data: Category;
		};
		author: {
			data: Author;
		};
		blocks: (RichTextBlock | MediaBlock)[];
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
	};
}