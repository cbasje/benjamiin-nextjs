import App from "next/app";
import type { AppContext, AppProps } from "next/app";
import * as Toast from "@radix-ui/react-toast";
import { AnimatePresence } from "framer-motion";

import { Global } from "@/lib/types";
import { sanityClient } from "@/lib/sanity-server";
import { globalQuery } from "@/lib/queries";

import { GlobalProvider } from "@/contexts/GlobalContext";
import { globalStyles } from "@/stitches.config";

interface MyAppProps {
    global: Global[];
}

const MyApp = ({ Component, pageProps, router }: AppProps) => {
    // @ts-ignore
    const { global }: MyAppProps = pageProps;

    globalStyles();

    return (
        <>
            <GlobalProvider
                props={{
                    global,
                }}
            >
                <Toast.Provider>
                    <AnimatePresence mode="wait" initial={false}>
                        <Component {...pageProps} key={router.route} />
                    </AnimatePresence>
                </Toast.Provider>
            </GlobalProvider>
        </>
    );
};

MyApp.getInitialProps = async (ctx: AppContext) => {
    const appProps = await App.getInitialProps(ctx);

    // Fetch global site settings from Strapi
    const globalRes = await sanityClient.fetch<Global[]>(globalQuery);

    type PageProps = Omit<MyAppProps, "layout" | "children">;
    return {
        ...appProps,
        pageProps: {
            global: globalRes,
        } as PageProps,
    };
};

export default MyApp;
