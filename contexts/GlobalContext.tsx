import { createContext, useContext, useState } from "react";

import { Global, Locale } from "@/lib/types";

export type GlobalWithoutId = Omit<Global, "_id">;
interface GlobalProps {
    global: GlobalWithoutId[];
}

const GlobalContext = createContext<GlobalProps>({
    global: [
        {
            siteName: "",
            siteKeywords: "",
            defaultSeo: {
                metaTitle: "",
                metaDescription: "",
                shareImage: undefined,
                isArticle: false,
                locale: Locale.EN,
            },
        },
    ],
});

export function useGlobal() {
    return useContext(GlobalContext);
}

export function GlobalProvider({
    children,
    props,
}: {
    children: React.ReactNode;
    props: GlobalProps;
}) {
    const [global, setGlobal] = useState<GlobalWithoutId[]>(props.global);

    return (
        <GlobalContext.Provider
            value={{
                global,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
