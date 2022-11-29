import Link from "next/link";
import { useRouter } from "next/router";
import {
    EnvelopeSimple,
    GithubLogo,
    InstagramLogo,
    LinkedinLogo,
} from "phosphor-react";

import { Locale } from "@/lib/types";
import { styled } from "@/stitches.config";

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
    gap: "$1",

    fontFamily: "$display",
    fontWeight: "$bold",
    textTransform: "uppercase",
    letterSpacing: ".05em",

    variants: {
        side: {
            left: {
                justifyContent: "flex-start",
            },
            right: {
                justifyContent: "flex-end",
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
                    <StyledLi role="listitem">
                        <StyledAnchor
                            title="My email address"
                            href="mailto:Sebastiaan Benjamins <sebas@benjami.in>"
                        >
                            <EnvelopeSimple
                                size={24}
                                weight="bold"
                                aria-hidden
                            />
                        </StyledAnchor>
                    </StyledLi>
                    <StyledLi role="listitem">
                        <StyledAnchor
                            title="My Github account"
                            href="https://github.com/cbasje"
                        >
                            <GithubLogo size={24} weight="bold" aria-hidden />
                        </StyledAnchor>
                    </StyledLi>
                    <StyledLi role="listitem">
                        <StyledAnchor
                            title="My LinkedIn account"
                            href="https://www.linkedin.com/in/sebastiaanbenjamins/"
                        >
                            <LinkedinLogo size={24} weight="bold" aria-hidden />
                        </StyledAnchor>
                    </StyledLi>
                    <StyledLi role="listitem">
                        <StyledAnchor
                            title="My Instagram account"
                            href="https://instagram.com/cbasje"
                        >
                            <InstagramLogo
                                size={24}
                                weight="bold"
                                aria-hidden
                            />
                        </StyledAnchor>
                    </StyledLi>
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
                </StyledUl>
            </StyledNav>
        </StyledHeader>
    );
};

export default Header;
