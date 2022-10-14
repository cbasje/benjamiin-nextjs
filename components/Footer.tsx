// import { useRouter } from "next/router";

// import { Locale } from "@/lib/types";

import { styled } from "@/stitches.config";
// import LanguageSwitcher from "./LanguageSwitcher";
import SpotifyPlayer from "./SpotifyPlayer";
import { Copyright } from "phosphor-react";

const StyledFooter = styled("footer", {
    width: "100vw",
    paddingBlock: "$2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    filter: "grayscale(100%)",
    transition: "filter .8s cubic-bezier(.33,1,.68,1)",

    "&:hover": {
        filter: "grayscale(0%)",
    },

    "& > *": {
        width: "100%",
        maxWidth: 1024,
    },
});

const StyledAside = styled("aside", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

const StyledUl = styled("ul", {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "flex",
    maxWidth: "30%",
    position: "relative",
    alignItems: "center",

    variants: {
        side: {
            left: {
                justifyContent: "flex-start",
                gap: 16,
            },
            right: {
                justifyContent: "flex-end",
                gap: 0,
            },
        },
    },
});

const StyledLi = styled("li", {
    maxWidth: "100%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "$1",

    "& > span": {
        fontFamily: "$display",
        fontWeight: "$bold",
        textTransform: "uppercase",
    },
});

const Footer = () => {
    // const router = useRouter();
    // const locale = router.query.locale as Locale;

    // const handleLocaleChange = (newLocale: Locale) => {
    //     router.push({
    //         pathname: "/[locale]",
    //         query: {
    //             locale: newLocale,
    //         },
    //     });
    // };

    return (
        <StyledFooter>
            <StyledAside>
                <StyledUl role="list" side="left">
                    <StyledLi role="listitem">
                        <Copyright weight="bold" />
                        <span>
                            Sebastiaan Benjamins, {new Date().getFullYear()}
                        </span>
                    </StyledLi>
                    {/* FIXME: Move this
                    <StyledLi role='listitem'>
                        <LanguageSwitcher
                            locale={locale}
                            onLocaleChange={handleLocaleChange}
                        />
                    </StyledLi> */}
                </StyledUl>
                <StyledUl role="list" side="right">
                    <StyledLi role="listitem">
                        <SpotifyPlayer />
                    </StyledLi>
                </StyledUl>
            </StyledAside>
        </StyledFooter>
    );
};

export default Footer;
