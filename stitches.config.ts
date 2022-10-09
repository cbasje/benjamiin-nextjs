import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";

export const { globalCss, styled, getCssText, createTheme } = createStitches({
    theme: {
        colors: {
            purple0: "#f3f0ff",
            purple1: "#e5dbff",
            purple2: "#d0bfff",
            purple3: "#b197fc",
            purple4: "#9775fa",
            purple5: "#845ef7",
            purple6: "#7950f2",
            purple7: "#7048e8",
            purple8: "#6741d9",
            purple9: "#5f3dc4",
            green0: "#f4fce3",
            green1: "#e9fac8",
            green2: "#d8f5a2",
            green3: "#c0eb75",
            green4: "#a9e34b",
            green5: "#94d82d",
            green6: "#82c91e",
            green7: "#74b816",
            green8: "#66a80f",
            green9: "#5c940d",
            blue0: "#e7f5ff",
            blue1: "#d0ebff",
            blue2: "#a5d8ff",
            blue3: "#74c0fc",
            blue4: "#4dabf7",
            blue5: "#339af0",
            blue6: "#228be6",
            blue7: "#1c7ed6",
            blue8: "#1971c2",
            blue9: "#1864ab",
            gray0: "#f8f9fa",
            gray1: "#f1f3f5",
            gray2: "#e9ecef",
            gray3: "#dee2e6",
            gray4: "#ced4da",
            gray5: "#adb5bd",
            gray6: "#868e96",
            gray7: "#495057",
            gray8: "#343a40",
            gray9: "#212529",

            primary: "$purple3",
            primaryDark: "$purple5",
            textOnPrimary: "$gray1",
            displayOnPrimary: "$gray0",
            bg: "$gray0",
            textOnBg: "$gray8",
            displayOnBg: "$gray9",
        },
        space: {
            1: "0.5rem",
            2: "1rem",
            3: "1.5rem",
            4: "2rem",
            5: "2.5rem",
            6: "3rem",

            headerHeight: "5.5rem",
        },
        radii: {
            sm: "0.5rem",
            md: "1rem",
            lg: "1.5rem",
            full: "99999px",
        },
        fonts: {
            display:
                "Space Mono, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Helvetica Neue, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
            text: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Helvetica Neue, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
            mono: "Space Mono, monospace",
        },
        fontSizes: {},
        fontWeights: {
            regular: 400,
            bold: 700,
        },
    },
    media: {
        sm: "(min-width: 640px)",
        md: "(min-width: 768px)",
        lg: "(min-width: 1024px)",
    },
});

export const globalStyles = globalCss({
    body: {
        padding: 0,
        margin: 0,
        fontFamily: "$text",
        backgroundColor: "$bg",
        color: "$textOnBg",
        accentColor: "$colors$primary",
        caretColor: "$colors$primary",
        fontSize: "1rem",
        lineHeight: 1.5,
    },
    "h1, h2, h3, h4, h5, h6": {
        fontFamily: "$display",
        fontWeight: "$bold",
        textTransform: "uppercase",
        letterSpacing: "0.05rem",
        color: "$displayOnBg",

        overflowWrap: "break-word",
    },
    p: {
        margin: "0 0 1.5em",
        overflowWrap: "break-word",
    },
    a: {
        color: "inherit",
        textDecoration: "none",
    },
    "*": {
        boxSizing: "border-box",
    },
    "::selection": {
        backgroundColor: "$primary",
        color: "$textOnPrimary",
    },
});

export const lightTheme = createTheme("light", {
    colors: {},
});
export const darkTheme = createTheme("dark", {
    colors: {},
});

export const Main = styled("main", {
    width: "100vw",
    marginInline: "auto",
    paddingInline: "$2",
    // paddingBlock: "$6",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "$6",

    "& > *": {
        width: "100%",
        maxWidth: "1024px",
    },
});

export const Article = styled("article", {
    width: "100%",
    maxWidth: "60ch",
    marginInline: "auto",
    paddingInline: "$2",
    paddingBlock: "$6",
});

export const Flex = styled("div", { display: "flex" });
export const Box = styled("div", {});

export const BlocksContainer = styled("div", {});

export const CarouselContainer = styled("div", {});

export const Button = styled("button", {
    all: "unset",

    paddingBlock: "$1",
    paddingInline: "$2",
    cursor: "pointer",
    userSelect: "none",
    outline: "currentColor",

    $$gradient:
        "linear-gradient(135deg, $colors$purple4, $colors$blue4, $colors$green4)",
    "&:hover": {
        $$gradient:
            "linear-gradient(135deg, $colors$purple3, $colors$blue3, $colors$green3)",
    },

    variants: {
        variant: {
            primary: {
                background: "$$gradient",
                color: "$textOnPrimary",
            },
        },
        outlined: {
            true: {
                position: "relative",
                margin: "$1",

                "&:before": {
                    content: '""',
                    display: "block",
                    padding: "$1",
                    position: "absolute",
                    inset: "-$1",
                    borderRadius: "inherit",
                    background: "$$gradient",
                    mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    maskComposite: "exclude",
                    WebkitMask:
                        "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                    WebkitMaskComposite: "xor",
                    zIndex: -1,
                },
            },
        },
    },

    defaultVariants: {
        variant: "primary",
    },

    compoundVariants: [
        {
            variant: "primary",
            outlined: true,
            css: {
                color: "$textOnBg",
                background: "none",
                "&:hover": {
                    background: "none",
                },
            },
        },
    ],
});
