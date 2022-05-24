interface Author {
	id: number;
	attributes: {
		name: string;
		email: string;
		picture: { data?: Picture };
		createdAt: Date;
		updatedAt: Date;
	};
}
