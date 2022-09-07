import { Locale } from "@/lib/types";

export const getLocaleLabel = (locale: Locale) => {
    switch (locale) {
        case Locale.EN:
            return "🇬🇧 English";
        case Locale.NL:
            return "🇳🇱 Nederlands";
        default:
            return "";
    }
};

export const parseLocale = async (locale: Locale): Promise<string> => {
    const index = Object.values(Locale).indexOf(locale);
    return Object.values(Locale)[index === -1 ? 0 : index];
};
