import { useEffect } from 'react';

import Prism from '@/util/prism.js';

import { CodeBlock as CodeBlockType } from '@/models/block';

const Code = ({ body, lang }: CodeBlockType) => {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<pre>
			<code className={`language-${lang}`}>{body}</code>
		</pre>
	);
};

export default Code;
