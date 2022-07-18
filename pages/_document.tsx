import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '@/stitches.config';

export default class Document extends NextDocument {
	render() {
		return (
			// TODO: update lang
			<Html>
				<Head>
					<style
						id="stitches"
						dangerouslySetInnerHTML={{ __html: getCssText() }}
					/>
					<link rel="shortcut icon" href="/favicon.ico" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
