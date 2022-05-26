interface Author {
	id: number;
	attributes: {
		name: string;
		email: string;
		picture: {
			data?: Picture;
		};
		articles: {
			data?: Article[];
		};
		createdAt: Date;
		updatedAt: Date;
	};
}
