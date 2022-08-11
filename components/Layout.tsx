import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

import Seo from "./Seo";
import { styled } from "@/stitches.config";

import { Seo as SeoType } from "@/models/seo";

export interface LayoutProps {
    seo?: SeoType;
    children: ReactNode;
    variants?: Variants;
}

const AnimateContainer = styled(motion.div, {
    width: "100%",
    height: "100%",
});

const Layout = ({ seo, children, variants }: LayoutProps) => {
    return (
        <>
            <Seo seo={seo} />
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
