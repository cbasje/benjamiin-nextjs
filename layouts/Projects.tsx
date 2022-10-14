import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "phosphor-react";
import { ReactNode } from "react";

import { dialogOverlayVariants, dialogVariants } from "@/lib/transition";
import { Project, Seo } from "@/lib/types";

import { Article, styled } from "@/stitches.config";
import MainLayout from "./Main";

const StyledOverlay = styled(DialogPrimitive.Overlay, {
    backgroundColor: "rgb(33 37 41 / 35%)", // TODO: convert everything to space rgba
    position: "fixed",
    inset: 0,
    zIndex: -1,
});

const StyledContent = styled(DialogPrimitive.Content, {
    backgroundColor: "rgb($bg)",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginTop: "4em",
    width: "100vw",
    height: "calc(100vh - 4em)",
    overflowY: "scroll",

    "&:focus": { outline: "none" },
});

const StyledTitle = styled(DialogPrimitive.Title, {
    margin: 0,
    fontWeight: 500,
    color: "rgb($textOnBg)",
    fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
    margin: "10px 0 20px",
    color: "rgb($textOnBg)",
    fontSize: 15,
    lineHeight: 1.5,
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

    "&:hover": { backgroundColor: "rgb($purple400)" },
    "&:focus": { boxShadow: "0 0 0 2px rgb($purple400)" },
});

const Content = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <>
            <motion.div variants={dialogOverlayVariants}>
                <StyledOverlay />
                <DialogClose asChild>
                    <IconButton aria-label="Close">
                        <X size="2em" weight="bold" />
                    </IconButton>
                </DialogClose>
            </motion.div>
            <motion.div variants={dialogVariants}>
                <StyledContent {...props}>
                    <Article css={{ minHeight: "100%" }}>{children}</Article>
                </StyledContent>
            </motion.div>
        </>
    );
};

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

const ProjectsLayout = ({
    seo,
    project,
    onClose,
    children,
}: {
    seo: Seo;
    project: Project;
    children: ReactNode;
    onClose: () => void;
}) => {
    return (
        <MainLayout seo={seo} noTopPadding>
            <Dialog open={true} onOpenChange={(e) => !e && onClose()}>
                <DialogContent>
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>

                    {children}
                </DialogContent>
            </Dialog>
        </MainLayout>
    );
};

export default ProjectsLayout;
