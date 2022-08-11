import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";

export const { globalCss, styled, getCssText, createTheme } = createStitches({
    theme: {
        colors: {
            primary0: "#f3f0ff",
            primary1: "#e5dbff",
            primary2: "#d0bfff",
            primary3: "#b197fc",
            primary4: "#9775fa",
            primary5: "#845ef7",
            primary6: "#7950f2",
            primary7: "#7048e8",
            primary8: "#6741d9",
            primary9: "#5f3dc4",
            secondary0: "#f4fce3",
            secondary1: "#e9fac8",
            secondary2: "#d8f5a2",
            secondary3: "#c0eb75",
            secondary4: "#a9e34b",
            secondary5: "#94d82d",
            secondary6: "#82c91e",
            secondary7: "#74b816",
            secondary8: "#66a80f",
            secondary9: "#5c940d",
            tertiary0: "#e7f5ff",
            tertiary1: "#d0ebff",
            tertiary2: "#a5d8ff",
            tertiary3: "#74c0fc",
            tertiary4: "#4dabf7",
            tertiary5: "#339af0",
            tertiary6: "#228be6",
            tertiary7: "#1c7ed6",
            tertiary8: "#1971c2",
            tertiary9: "#1864ab",
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

            primary: "$primary3",
            primaryDark: "$primary5",
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

export const Container = styled("div", {
    width: "100%",
    maxWidth: "60ch",
    marginInline: "auto",
    paddingInline: "$2",
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
        "linear-gradient(135deg, $colors$primary4, $colors$tertiary4, $colors$secondary4)",
    "&:hover": {
        $$gradient:
            "linear-gradient(135deg, $colors$primary3, $colors$tertiary3, $colors$secondary3)",
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
