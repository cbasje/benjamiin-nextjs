import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";

export const { globalCss, styled, getCssText, createTheme } = createStitches({
    theme: {
        colors: {
            purple50: "250 245 255",
            purple100: "243 232 255",
            purple200: "233 213 255",
            purple300: "216 180 254",
            purple400: "192 132 252",
            purple500: "168 85 247",
            purple600: "147 51 234",
            purple700: "126 34 206",
            purple800: "107 33 168",
            purple900: "88 28 135",
            green50: "240 253 244",
            green100: "220 252 231",
            green200: "187 247 208",
            green300: "134 239 172",
            green400: "74 222 128",
            green500: "34 197 94",
            green600: "22 163 74",
            green700: "21 128 61",
            green800: "22 101 52",
            green900: "20 83 45",
            blue50: "236 254 255",
            blue100: "207 250 254",
            blue200: "165 243 252",
            blue300: "103 232 249",
            blue400: "34 211 238",
            blue500: "6 182 212",
            blue600: "8 145 178",
            blue700: "14 116 144",
            blue800: "21 94 117",
            blue900: "22 78 99",
            gray50: "249 250 251",
            gray100: "243 244 246",
            gray200: "229 231 235",
            gray300: "209 213 219",
            gray400: "156 163 175",
            gray500: "107 114 128",
            gray600: "75 85 99",
            gray700: "55 65 81",
            gray800: "31 41 55",
            gray900: "17 24 39",

            primary: "$purple300",
            primaryDark: "$purple500",
            textOnPrimary: "$gray100",
            displayOnPrimary: "$gray50",
            bg: "$gray50",
            textOnBg: "$gray800",
            displayOnBg: "$gray900",
        },
        space: {
            1: "0.5rem",
            2: "1rem",
            3: "1.5rem",
            4: "2rem",
            5: "2.5rem",
            6: "3rem",

            headerHeight: "5.5rem",
            footerHeight: "4.5rem",
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
        backgroundColor: "rgb($bg)",
        color: "rgb($textOnBg)",
        accentColor: "rgb($colors$primary)",
        caretColor: "rgb($colors$primary)",
        fontSize: "1rem",
        lineHeight: 1.5,
    },
    "h1, h2, h3, h4, h5, h6": {
        margin: "0 0 1.1em",
        fontFamily: "$display",
        fontWeight: "$bold",
        textTransform: "uppercase",
        letterSpacing: "0.05rem",
        lineHeight: 1.1,
        color: "rgb($displayOnBg)",

        overflowWrap: "break-word",
    },
    p: {
        margin: "0 0 1.5em",
        overflowWrap: "break-word",
        lineHeight: 1.5,
    },
    a: {
        color: "inherit",
        textDecoration: "none",
    },
    "*": {
        boxSizing: "border-box",
    },
    "::selection": {
        backgroundColor: "rgb($primary)",
        color: "rgb($textOnPrimary)",
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
        maxWidth: 1024,
    },
});

export const Box = styled("div");
export const Flex = styled("div", {
    display: "flex",
});
export const Grid = styled("div", {
    display: "grid",
});

export const Line = styled("hr", {
    all: "unset",
    height: 1.4,
    background: "rgb($gray900 / 8%)",
});

export const BlocksContainer = styled("div");

export const CarouselContainer = styled("div");

export const Button = styled("button", {
    all: "unset",

    cursor: "pointer",
    userSelect: "none",
    outline: "currentColor",
    borderRadius: "$sm",

    $$gradient:
        "linear-gradient(135deg, rgb($colors$purple400), rgb($colors$blue400), rgb($colors$green400))",
    "&:hover": {
        $$gradient:
            "linear-gradient(135deg, rgb($colors$purple300), rgb($colors$blue300), rgb($colors$green300))",
    },

    variants: {
        size: {
            normal: {
                paddingBlock: "$1",
                paddingInline: "$2",
            },
            lg: {
                paddingBlock: "$2",
                paddingInline: "$3",

                fontSize: "x-large",
                fontFamily: "$display",
                fontWeight: "$bold",
                textTransform: "uppercase",
            },
        },
        variant: {
            primary: {
                background: "$$gradient",
                color: "rgb($textOnPrimary)",
            },
            black: {
                background: "rgb($gray900)",
                color: "rgb($gray100)",
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
                color: "rgb($textOnBg)",
                background: "none",
                "&:hover": {
                    background: "none",
                },
            },
        },
    ],
});
