import { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheetDocument } from "next-sanity/studio";

import { getCssText } from "@/stitches.config";

export default class Document extends ServerStyleSheetDocument {
    render() {
        return (
            // TODO: update lang
            <Html lang="en">
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
