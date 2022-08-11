import { createContext, useContext, useState } from "react";

import { GlobalAttributes as GlobalAttributesType } from "@/models/global";
import { Category as CategoryType } from "@/models/category";
import { Contact as ContactType } from "@/models/contact";
import { About as AboutType } from "@/models/about";
import { Locale } from "@/models/locale";

interface GlobalProps {
    global: GlobalAttributesType;
    categories: CategoryType[];
    contacts: ContactType[];
    abouts: AboutType[];
}

const GlobalContext = createContext<GlobalProps>({
    global: {
        siteName: "",
        siteDescription: "",
        defaultSeo: {
            metaTitle: "",
            metaDescription: "",
            shareImage: { data: undefined },
            isArticle: false,
            locale: Locale.EN,
        },
    },
    categories: [],
    contacts: [],
    abouts: [],
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
    const [global, setGlobal] = useState<GlobalAttributesType>(props.global);
    const [categories, setCategories] = useState<CategoryType[]>(
        props.categories
    );
    const [contacts, setContacts] = useState<ContactType[]>(props.contacts);
    const [abouts, setAbouts] = useState<AboutType[]>(props.abouts);

    return (
        <GlobalContext.Provider
            value={{
                global,
                categories,
                contacts,
                abouts,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
