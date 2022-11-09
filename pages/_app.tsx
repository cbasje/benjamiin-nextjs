import { Inter, Space_Mono } from "@next/font/google";
import localFont from "@next/font/local";
import * as Toast from "@radix-ui/react-toast";
import { AnimatePresence } from "framer-motion";
import type { AppContext, AppProps as NextAppProps } from "next/app";
import App from "next/app";

import { GlobalProvider } from "@/contexts/GlobalContext";
import { globalQuery } from "@/lib/queries";
import { sanityClient } from "@/lib/sanity-server";
import { Global } from "@/lib/types";
import { globalStyles, styled } from "@/stitches.config";

const AppWrapper = styled("div", {
    fontFamily: "$text",
    minWidth: "100vw",
    minHeight: "100vh",
});

export const inter = Inter({
    subsets: ["latin"],
    variable: "--fonts-text",
    fallback: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
    ],
});
export const spaceMono = Space_Mono({
    subsets: ["latin"],
    variable: "--fonts-display",
    weight: ["400", "700"],
    fallback: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
    ],
});
export const cascadiaCode = localFont({
    variable: "--fonts-mono",
    src: [
        { path: "../public/fonts/CascadiaCode.woff2", style: "normal" },
        { path: "../public/fonts/CascadiaCodeItalic.woff2", style: "italic" },
    ],
    fallback: ["monospace"],
});
export const inconstant = localFont({
    variable: "--fonts-dyslexic",
    src: "../public/fonts/Inconstant.woff2",
    fallback: [
        "-apple-system",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
    ],
});

interface MyAppProps {
    global: Global[];
}

const MyApp = ({ Component, pageProps, router }: NextAppProps<MyAppProps>) => {
    const { global } = pageProps;

    globalStyles();

    return (
        <>
            <GlobalProvider
                props={{
                    global,
                }}
            >
                <Toast.Provider>
                    <AppWrapper
                        className={[
                            spaceMono.variable,
                            inter.variable,
                            cascadiaCode.variable,
                            inconstant.variable,
                        ].join(" ")}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <Component {...pageProps} key={router.route} />
                        </AnimatePresence>
                    </AppWrapper>
                </Toast.Provider>
            </GlobalProvider>
        </>
    );
};

MyApp.getInitialProps = async (ctx: AppContext) => {
    const appProps = await App.getInitialProps(ctx);

    // Fetch global site settings from Strapi
    const globalRes = await sanityClient.fetch<Global[]>(globalQuery);

    return {
        ...appProps,
        pageProps: {
            global: globalRes,
        },
    };
};

export default MyApp;
