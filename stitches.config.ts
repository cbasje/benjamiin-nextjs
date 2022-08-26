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
            textOnPrimary: "$gray0",
            bg: "$gray0",
            textOnBg: "$gray9",
        },
        space: {
            1: "0.5rem",
            2: "1rem",
            3: "1.5rem",
            4: "2rem",
            5: "2.5rem",
            6: "3rem",
        },
        radii: {
            sm: "0.5rem",
            md: "1rem",
            lg: "1.5rem",
        },
        fonts: {
            system: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, sans-serif",
            code: "Cascadia Code, monospace",
        },
        fontSizes: {},
    },
    media: {
        sm: "(min-width: 640px)",
        md: "(min-width: 768px)",
        lg: "(min-width: 1024px)",
    },
});

export const globalStyles = globalCss({
    "@font-face": [
        {
            fontFamily: "Cascadia Code",
            src: 'url("/fonts/CascadiaCode.woff2") format("woff2")',
            fontVariant: "normal",
        },
        {
            fontFamily: "Cascadia Code",
            src: 'url("/fonts/CascadiaCodeItalic.woff2") format("woff2")',
            fontStyle: "italic",
            fontVariant: "normal",
        },
    ],
    body: {
        padding: 0,
        margin: 0,
        fontFamily: "$system",
        backgroundColor: "$bg",
        accentColor: "$colors$primary",
        caretColor: "$colors$primary",
        fontSize: "1rem",
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

export const lightTheme = createTheme("light-theme", {
    colors: {
        primary: "$red400",
        primaryDark: "$red500",
    },
});
export const darkTheme = createTheme("dark-theme", {
    colors: {
        primary: "$red400",
        primaryDark: "$red500",
    },
});

export const Container = styled("div", {
    width: "100%",
    maxWidth: "60ch",
    marginInline: "auto",
    paddingInline: "$2",

    variants: {
        paddingY: {
            true: {
                paddingBlock: "$6",
            },
        },
    },
});

export const Flex = styled("div", { display: "flex" });
export const Box = styled("div", {});

export const BlocksContainer = styled("div", {});

export const CarouselContainer = styled("div", {});

export const Button = styled("button", {
    all: "unset",

    borderRadius: "99999px",
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
