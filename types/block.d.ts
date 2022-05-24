interface Block {
	id: number;
	__component: string;
}

interface RichTextBlock extends Block {
	body: string;
}

interface MediaBlock extends Block {
	file: {
		data: Picture;
	};
}
