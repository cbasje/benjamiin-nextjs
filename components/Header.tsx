import Link from "next/link";
import { useRouter } from "next/router";

import { Locale } from "@/lib/types";
import { styled } from "@/stitches.config";
import { ArrowUpRight } from "phosphor-react";

const StyledHeader = styled("header", {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100vw",
    padding: "$2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9,

    "& > *": {
        width: "100%",
        maxWidth: 1024,
    },
});

const StyledNav = styled("nav", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgb($bg / 75%)",
    // boxShadow: "0 6px 20px rgb(0 0 0 / 8%)",
    WebkitBackdropFilter: "blur(15px)",
    backdropFilter: "blur(15px)",
    borderRadius: "$md",
});

const StyledUl = styled("ul", {
    margin: 0,
    padding: "$1",
    listStyle: "none",
    position: "relative",
    display: "flex",
    alignItems: "center",

    fontFamily: "$display",
    fontWeight: "$bold",
    textTransform: "uppercase",
    letterSpacing: ".05em",

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

const StyledAnchor = styled(Link, {
    paddingBlock: "$1",
    paddingInline: "$2",
    display: "flex",
    flexDirection: "row",
    gap: "$1",
    flexGrow: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "$sm",
    transition: "background-color .2s cubic-bezier(.33,1,.68,1)",

    "&:hover": {
        backgroundColor: "rgb($gray200)",
    },

    "&:active": {
        color: "rgb($gray50) !important",
        backgroundColor: "rgb($gray900) !important",

        "&:hover": {
            backgroundColor: "rgb($gray900) !important",
        },
    },
});

const StyledLi = styled("li", {});

const StyledUnderline = styled("hr", {
    all: "unset",
    position: "absolute",
    bottom: 0,
    left: 72,
    width: 16,
    height: 3,
    borderRadius: 1.5,
    background: "rgb($gray900)",
    transition: "transform .2s cubic-bezier(.33,1,.68,1)",
});

const Header = () => {
    const router = useRouter();
    const locale = router.query.locale as Locale;

    return (
        <StyledHeader>
            <StyledNav>
                <StyledUl role="list" side="left">
                    <StyledLi role="listitem">
                        <StyledAnchor
                            href={{
                                pathname: "/[locale]",
                                query: {
                                    locale,
                                },
                            }}
                        >
                            Sebastiaan Benjamins
                        </StyledAnchor>
                    </StyledLi>
                </StyledUl>
                <StyledUl role="list" side="right">
                    {/* TODO:
                    <StyledLi role="listitem">
                        <StyledAnchor
                            href={{
                                pathname: "/[locale]/about",
                                query: {
                                    locale,
                                },
                            }}
                            className="link"
                        >
                            About
                        </StyledAnchor>
                    </StyledLi> */}
                    <StyledLi role="listitem">
                        <StyledAnchor href="mailto:Sebastiaan Benjamins <sebas@benjami.in>">
                            <span>Contact</span>
                            <ArrowUpRight size={24} weight="bold" />
                        </StyledAnchor>
                    </StyledLi>
                </StyledUl>
            </StyledNav>
        </StyledHeader>
    );
};

export default Header;
