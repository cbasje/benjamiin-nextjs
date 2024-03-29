import * as Toast from "@radix-ui/react-toast";
import { AnimatePresence } from "framer-motion";
import type { AppContext, AppProps as NextAppProps } from "next/app";
import App from "next/app";

import { GlobalProvider } from "@/contexts/GlobalContext";
import { globalQuery } from "@/lib/queries";
import { sanityClient } from "@/lib/sanity-server";
import { Global } from "@/lib/types";
import { globalStyles } from "@/stitches.config";

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

    return {
        ...appProps,
        pageProps: {
            global: globalRes,
        },
    };
};

export default MyApp;
