import {
    cascadiaCode,
    getCssText,
    inconstant,
    inter,
    spaceMono,
} from "@/stitches.config";
import { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheetDocument } from "next-sanity/studio";

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
                <body
                    className={[
                        spaceMono.variable,
                        inter.variable,
                        cascadiaCode.variable,
                        inconstant.variable,
                    ].join(" ")}
                >
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
