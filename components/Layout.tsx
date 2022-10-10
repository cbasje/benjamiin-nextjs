import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

import { styled } from "@/stitches.config";
import Meta from "./Meta";

import { Seo } from "lib/types";

export interface LayoutProps {
    seo?: Seo;
    children: ReactNode;
    variants?: Variants;
    noTopPadding?: boolean;
}

const AnimateContainer = styled(motion.div, {
    width: "100%",
    height: "100%",

    variants: {
        noTopPadding: {
            false: {
                paddingTop: "calc($headerHeight + $6)",
            },
        },
    },
});

const Layout = ({ seo, children, variants, noTopPadding }: LayoutProps) => {
    return (
        <>
            <Meta seo={seo} />

            <AnimateContainer
                initial="exit"
                animate="enter"
                exit="exit"
                variants={variants}
                noTopPadding={!!noTopPadding}
            >
                {children}
            </AnimateContainer>
        </>
    );
};

export default Layout;
