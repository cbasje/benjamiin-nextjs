import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

import { styled } from "@/stitches.config";
import Meta from "./Meta";

import { Seo } from "lib/types";

export interface LayoutProps {
    seo?: Seo;
    children: ReactNode;
    variants?: Variants;
}

const AnimateContainer = styled(motion.div, {
    width: "100%",
    height: "100%",
    paddingTop: "$headerHeight",
});

const Layout = ({ seo, children, variants }: LayoutProps) => {
    return (
        <>
            <Meta seo={seo} />

            <AnimateContainer
                initial="exit"
                animate="enter"
                exit="exit"
                variants={variants}
            >
                {children}
            </AnimateContainer>
        </>
    );
};

export default Layout;
