import { Variants, Transition } from "framer-motion";

// const easing = [0.175, 0.85, 0.42, 0.96];
export const transition: Transition = {
    duration: 0.375,
    ease: [0.43, 0.13, 0.23, 0.96],
};

export const pageVariants: Variants = {
    exit: { opacity: 0, transition },
    enter: {
        opacity: 1,
        transition,
    },
};

export const dialogVariants: Variants = {
    exit: { y: 150, opacity: 0, transition },
    enter: {
        y: 0,
        opacity: 1,
        transition,
    },
};

export const dialogOverlayVariants: Variants = {
    exit: { opacity: 0, transition },
    enter: {
        opacity: 1,
        transition,
    },
};

export const thumbnailVariants: Variants = {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 1.5, ...transition },
    },
};

export const frameVariants: Variants = {
    hover: { scale: 0.95 },
};

export const imageVariants: Variants = {
    hover: { scale: 1.1 },
};
