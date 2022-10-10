import Error from "next/error";

import { Home } from "@/lib/types";
import { styled } from "@/stitches.config";
import Image from "next/future/image";

const IntroContainer = styled("div", {
    border: "8px solid rgb($gray900 / 10%)",
    borderRadius: "$md",
    position: "relative",
});

const TextContainer = styled("div", {
    position: "absolute",
    bottom: "$2",
    left: "$2",
    maxWidth: "50%",
    display: "flex",
    flexDirection: "column",
    gap: "$2",
});

const StyledHeading = styled("h1", {
    margin: 0,
    fontSize: "5rem",
    lineHeight: 1.1,
});
const StyledParagraph = styled("p", {
    margin: 0,
    fontSize: "1.25rem",
});

const StyledSVG = styled("svg", {
    opacity: "45%",
    filter: "blur(7vw)",
    width: "140%",
    height: "auto",
    aspectRatio: "16/9",
    position: "absolute",
    bottom: "-35%",
    right: "-40%",
    zIndex: "-1",
});

const StyledPath = styled("path");

const StyledImage = styled(Image, {
    position: "absolute",
    top: "-45px",
    right: "-130px",
    width: "650px",
    height: "auto",
    mask: "linear-gradient(black, black) top left / 528px 685px no-repeat",
    WebkitMask:
        "linear-gradient(black, black) top left / 528px 685px no-repeat",
});

const ProjectGrid = ({ homepage }: { homepage: Home }) => {
    if (!homepage) return <Error statusCode={404} />;

    return (
        <IntroContainer>
            <TextContainer>
                <StyledHeading role="heading">{homepage.title}</StyledHeading>
                <StyledParagraph>
                    Lorem mollit Lorem sit est duis Lorem dolor sint. Aliqua est
                    velit in do veniam quis amet et deserunt et esse eiusmod.
                    {homepage.description}
                </StyledParagraph>
            </TextContainer>

            <StyledSVG
                width="2087"
                height="1451"
                viewBox="0 0 2087 1451"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <StyledPath
                        d="M1575.41 489.305C1649.87 567.411 1748.74 646.17 1735.8 746.769C1721.15 860.735 1626.71 954.321 1511.48 986.515C1400.42 1017.54 1286.73 959.84 1182.9 901.237C1074.32 839.951 946.008 773.863 928.575 657.507C911.275 542.037 1006.7 446.057 1105.28 383.173C1182.71 333.785 1283.09 349.712 1377.65 371.059C1456.32 388.818 1520.29 431.476 1575.41 489.305Z"
                        css={{ fill: "rgb($green400)" }}
                    />
                </g>
                <g>
                    <StyledPath
                        d="M772.241 428.881C839.251 424.457 904.428 434.001 958.123 460.457C1012.73 487.363 1053.58 528.87 1076.53 578.808C1099.7 629.232 1101.66 686.246 1088.15 743.409C1074.17 802.541 1049.16 862.676 998.225 909.987C946.788 957.768 877.558 996.348 805.497 1005.97C737.216 1015.09 681.369 981.909 622.994 960.085C573.409 941.549 532.284 916.297 490.699 888.286C439.306 853.668 357.798 834.198 350.579 776.593C343.408 719.365 414.664 667.832 456.499 615.373C494.136 568.178 527.251 518.119 582.938 485.228C640.159 451.43 706.571 433.217 772.241 428.881Z"
                        css={{ fill: "rgb($purple400)" }}
                    />
                </g>
                <g>
                    <StyledPath
                        d="M1220.31 602.262C1268.52 613.836 1317.29 630.302 1350.38 663.778C1383.37 697.157 1393.78 742.898 1402.84 786.929C1411.74 830.135 1416.39 874.417 1402.45 916.695C1388.3 959.57 1359.31 996.971 1323.33 1027.95C1286.71 1059.49 1243.76 1086 1194.39 1095.87C1144.94 1105.76 1094.04 1097.34 1046.02 1083.42C998.109 1069.52 950.457 1050.47 918.226 1015.78C886.479 981.603 877.109 936.107 868.334 892.161C859.766 849.249 853.604 805.261 867.837 763.418C882.197 721.203 911.903 684.464 948.894 655.335C985.525 626.489 1030.09 607.556 1077.55 598.276C1124.97 589.003 1173.6 591.046 1220.31 602.262Z"
                        css={{ fill: "rgb($blue400)" }}
                    />
                </g>
            </StyledSVG>

            <StyledImage
                width={1077}
                height={1616}
                src="/images/headshot.png"
                alt={"Headshot of me, Sebastiaan Benjamins"}
            />
        </IntroContainer>
    );
};

export default ProjectGrid;
