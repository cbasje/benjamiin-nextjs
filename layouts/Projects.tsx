import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "phosphor-react";
import { ReactNode } from "react";

import { dialogOverlayVariants, dialogVariants } from "@/lib/transition";
import { ProjectColour, Seo } from "@/lib/types";

import { styled } from "@/stitches.config";
import MainLayout from "./Main";

const StyledOverlay = styled(DialogPrimitive.Overlay, {
    position: "fixed",
    inset: 0,
    zIndex: -1,
});

const StyledContent = styled(DialogPrimitive.Content, {
    backgroundColor: "rgb($bg)",
    borderTopLeftRadius: "$md",
    borderTopRightRadius: "$md",
    marginTop: "4em",
    width: "100vw",
    height: "calc(100vh - 4em)",
    overflowY: "scroll",

    "&:focus": { outline: "none" },
});

const StyledTitle = styled(DialogPrimitive.Title, {
    margin: 0,
    fontSize: "2rem",
});

const StyledDescription = styled(DialogPrimitive.Description, {
    margin: 0,
    fontFamily: "$display",
    fontWeight: "$normal",
    color: "rgb($displayOnBg)",
    fontSize: "1.5rem",
});

const IconButton = styled("button", {
    all: "unset",
    fontFamily: "inherit",
    borderRadius: "100%",
    height: "3em",
    width: "3em",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "$gray0",
    position: "fixed",
    top: ".5em",
    right: ".5em",
    cursor: "pointer",
    pointerEvents: "all",
    zIndex: 1,
});

const Article = styled("article", {
    width: "100%",
    marginInline: "auto",
    paddingInline: "$2",
    paddingBlock: "calc($6 * 2)",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "$6",

    "& p, & > img": {
        width: "100%",
        maxWidth: "60ch",
        height: "auto",
        margin: 0,
    },
    "& > img": {
        borderRadius: "$sm",
        aspectRatio: "3 / 2",
        overflow: "hidden",
        objectFit: "cover",
    },
    "& :not(p, img)": {
        width: "100%",
        maxWidth: 1024,
    },
});

const Content = ({
    colour,
    children,
    ...props
}: {
    colour?: ProjectColour;
    children: ReactNode;
}) => {
    return (
        <>
            <motion.div variants={dialogOverlayVariants}>
                <StyledOverlay
                    css={
                        colour
                            ? {
                                  backgroundColor: `rgb($colors$${colour}900 / 25%)`,
                              }
                            : {
                                  backgroundColor: `rgb($gray900 / 25%)`,
                              }
                    }
                />
                <DialogClose asChild>
                    <IconButton
                        aria-label="Close"
                        css={
                            colour
                                ? {
                                      "&:hover": {
                                          backgroundColor: `rgb($colors$${colour}500)`,
                                      },
                                      "&:focus": {
                                          boxShadow: `0 0 0 2px rgb($colors$${colour}500)`,
                                      },
                                  }
                                : {
                                      "&:hover": {
                                          backgroundColor: "rgb($primary)",
                                      },
                                      "&:focus": {
                                          boxShadow: "0 0 0 2px rgb($primary)",
                                      },
                                  }
                        }
                    >
                        <X size="2em" weight="bold" />
                    </IconButton>
                </DialogClose>
            </motion.div>
            <motion.div variants={dialogVariants}>
                <StyledContent {...props}>
                    <Article>{children}</Article>
                </StyledContent>
            </motion.div>
        </>
    );
};

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogClose = DialogPrimitive.Close;

export const ProjectTitle = StyledTitle;
export const ProjectSubTitle = StyledDescription;

const ProjectsLayout = ({
    colour,
    seo,
    onClose,
    children,
}: {
    colour?: ProjectColour;
    seo: Seo;
    children: ReactNode;
    onClose: () => void;
}) => {
    return (
        <MainLayout seo={seo} noTopPadding>
            <Dialog open={true} onOpenChange={(e) => !e && onClose()}>
                <DialogContent colour={colour}>{children}</DialogContent>
            </Dialog>
        </MainLayout>
    );
};

export default ProjectsLayout;
