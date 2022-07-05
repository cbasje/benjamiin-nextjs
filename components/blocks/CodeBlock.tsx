import { useEffect } from 'react';

import Prism from '@/util/prism.js';

import { CodeBlock as CodeBlockType } from '@/models/block';

const CodeBlock = ({ body, lang }: CodeBlockType) => {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<pre>
			<code className={`language-${lang}`}>{body}</code>
		</pre>
	);
};

export default CodeBlock;
