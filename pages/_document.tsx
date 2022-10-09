import { getCssText } from "@/stitches.config";
import { ServerStyleSheetDocument } from "next-sanity/studio";
import { Head, Html, Main, NextScript } from "next/document";

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
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
