import Link from "next/link";
import { useRouter } from "next/router";

import { Locale } from "@/lib/types";
import { styled } from "@/stitches.config";
import {
    AppleLogo,
    Bank,
    CreditCard,
    PaperPlane,
    UsersFour,
} from "phosphor-react";

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

const StyledNav = styled("nav", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgb($bg / 75%)",
    // boxShadow: "0 6px 20px rgb(0 0 0 / 8%)",
    WebkitBackdropFilter: "blur(25px)",
    backdropFilter: "blur(25px)",
    borderRadius: "$md",
});

const StyledUl = styled("ul", {
    margin: 0,
    padding: 0,
    listStyle: "none",
    position: "relative",
    display: "flex",
    alignItems: "center",

    variants: {
        side: {
            left: {
                padding: 0,
                justifyContent: "flex-start",
                gap: 16,
            },
            right: {
                justifyContent: "flex-end",
                gap: 0,
                padding: 8,
            },
        },
    },
});

const StyledAnchor = styled(Link, {
    position: "relative",
    display: "flex",
    flexGrow: 0,
    justifyContent: "center",
    alignItems: "center",
});

const StyledLi = styled("li", {
    variants: {
        hasLogo: {
            true: {
                padding: "12px 8px 12px 12px",
                marginLeft: 8,

                "& .logo": {
                    position: "relative",
                    width: 20,
                    height: 20,
                    transition: "opacity .2s cubic-bezier(.33,1,.68,1)",
                    color: "rgb($gray900)",
                },
            },
        },
        hasIcon: {
            true: {
                [`& ${StyledAnchor}`]: {
                    width: 32,
                    height: 32,
                    backgroundColor: "rgb($gray100)",
                    border: "1px solid rgb($gray200)",
                    boxShadow: "0 6px 20px rgb($gray100 / 8%)",
                    borderRadius: 8,
                    // boxShadow: "0 6px 20px 0 rgb(0 0 0 / 8%)",
                    transition:
                        "background-color .2s cubic-bezier(.33,1,.68,1)",

                    "&:hover": {
                        backgroundColor: "rgb($gray200)",
                    },
                },
            },
        },
        isSelected: {
            true: {
                [`& ${StyledAnchor}`]: {
                    backgroundColor: "rgb($gray900) !important",

                    "&:hover": {
                        backgroundColor: "rgb($gray900) !important",
                    },
                },

                "& .icon": {
                    color: "rgb($gray50) !important",
                },
            },
        },
    },

    "& .icon": {
        position: "absolute",
        width: 16,
        height: 16,
        transition: "opacity .2s cubic-bezier(.33,1,.68,1)",
        color: "rgb($gray900)",
    },

    "&:hover .popup": {
        opacity: 1,
        visibility: "visible",
    },
    "& .popup": {
        bottom: 40,
        left: "50%",
        transform: "translate(-50%)",
        padding: "2px 8px",
        flexDirection: "column",
        justifyContent: "center",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "20px",
        textAlign: "center",
        letterSpacing: "-.035em",
        whiteSpace: "nowrap",
        background: "rgb($gray100)",
        border: "1px solid rgb($gray200)",
        borderRadius: "$sm",
        transition:
            "opacity .2s cubic-bezier(.33,1,.68,1),visibility .2s cubic-bezier(.33,1,.68,1)",

        position: "absolute",
        display: "flex",
        alignItems: "center",
        color: "rgb($gray900)",
        // boxShadow: "0 6px 20px rgb(255 255 255 / 8%)",
        WebkitBackdropFilter: "blur(25px)",
        backdropFilter: "blur(25px)",
        opacity: 0,
        visibility: "hidden",
    },

    "& .link": {
        display: "flex",
        padding: "8px 16px",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        zIndex: 1,
        textAlign: "center",
        letterSpacing: "-.01em",
        color: "rgb($gray900)",
        transition: "color .6s cubic-bezier(.23,1,.32,1)",
    },
});

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
                    <StyledLi role="listitem" hasLogo>
                        <StyledAnchor
                            href={{
                                pathname: "/[locale]",
                                query: {
                                    locale,
                                },
                            }}
                        >
                            <AppleLogo
                                className="logo"
                                size={20}
                                weight="fill"
                            />
                        </StyledAnchor>
                    </StyledLi>
                    <StyledLi role="listitem" hasIcon isSelected>
                        <StyledAnchor href="#">
                            <UsersFour
                                className="icon"
                                size={16}
                                weight="bold"
                                style={{
                                    opacity: 0,
                                }}
                            />
                            <UsersFour
                                className="icon"
                                size={16}
                                weight="fill"
                                style={{
                                    opacity: 1,
                                }}
                            />
                            <div className="popup">Raise</div>
                        </StyledAnchor>
                    </StyledLi>
                    <StyledLi role="listitem" hasIcon>
                        <StyledAnchor href="#">
                            <Bank className="icon" size={16} weight="bold" />
                            <div className="popup">Hold</div>
                        </StyledAnchor>
                    </StyledLi>
                    <StyledLi role="listitem" hasIcon>
                        <StyledAnchor href="#">
                            <CreditCard
                                className="icon"
                                size={16}
                                weight="bold"
                            />
                            <div className="popup">Spend</div>
                        </StyledAnchor>
                    </StyledLi>
                    <StyledLi role="listitem" hasIcon>
                        <StyledAnchor href="#">
                            <PaperPlane
                                className="icon"
                                size={16}
                                weight="bold"
                            />
                            <div className="popup">Send</div>
                        </StyledAnchor>
                    </StyledLi>

                    <StyledUnderline
                        style={{ transform: "translateX(0px) scale(1)" }}
                    />
                </StyledUl>
                <StyledUl role="list" side="right">
                    <StyledLi role="listitem">
                        <StyledAnchor href="#" className="link">
                            Twitter
                        </StyledAnchor>
                    </StyledLi>
                    <StyledLi role="listitem">
                        <StyledAnchor
                            href={
                                "mailto:Sebastiaan Benjamins <sebas@benjami.in>"
                            }
                            className="link"
                        >
                            Contact
                        </StyledAnchor>
                    </StyledLi>
                </StyledUl>
            </StyledNav>
        </StyledHeader>
    );
};

export default Header;
