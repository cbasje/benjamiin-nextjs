import { Button, styled } from "@/stitches.config";

const CTAContainer = styled("div", {
    border: "8px solid rgb($gray900 / 10%)",
    borderRadius: "$md",
    overflow: "hidden",
});

const CallToAction = () => {
    return (
        <CTAContainer>
            <Button>Let&apos;s talk</Button>
        </CTAContainer>
    );
};

export default CallToAction;
