import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { Inter, Space_Mono } from "@next/font/google";
import localFont from "@next/font/local";

import { styled } from "@/stitches.config";
import Meta from "@/components/Meta";

import { Seo } from "lib/types";

export interface LayoutProps {
    seo?: Seo;
    children: ReactNode;
    variants?: Variants;
    noTopPadding?: boolean;
}

const inter = Inter({
    subsets: ["latin"],
    variable: "--fonts-text",
    fallback: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
    ],
});
const spaceMono = Space_Mono({
    subsets: ["latin"],
    variable: "--fonts-display",
    weight: ["400", "700"],
    fallback: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
    ],
});
const cascadiaCode = localFont({
    variable: "--fonts-mono",
    src: [
        { path: "../public/fonts/CascadiaCode.woff2", style: "normal" },
        { path: "../public/fonts/CascadiaCodeItalic.woff2", style: "italic" },
    ],
    fallback: ["monospace"],
});
const inconstant = localFont({
    variable: "--fonts-dyslexic",
    src: "../public/fonts/Inconstant.woff2",
    fallback: [
        "-apple-system",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
    ],
});

const AnimateContainer = styled(motion.div, {
    width: "100%",
    height: "100%",

    fontFamily: "$text",

    variants: {
        noTopPadding: {
            false: {
                paddingTop: "calc($headerHeight + $6)",
            },
        },
    },
});

const MainLayout = ({ seo, children, variants, noTopPadding }: LayoutProps) => {
    return (
        <>
            <Meta seo={seo} />

            <AnimateContainer
                initial="exit"
                animate="enter"
                exit="exit"
                variants={variants}
                noTopPadding={!!noTopPadding}
                className={[
                    spaceMono.variable,
                    inter.variable,
                    cascadiaCode.variable,
                    inconstant.variable,
                ].join(" ")}
            >
                {children}
            </AnimateContainer>
        </>
    );
};

export default MainLayout;
