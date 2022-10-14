import Error from "next/error";

import { Home } from "@/lib/types";
import { styled } from "@/stitches.config";

const IntroContainer = styled("div");

const TextContainer = styled("div", {
    position: "absolute",
    bottom: "$3",
    left: "$3",
    maxWidth: "60%",
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
    position: "absolute",
    insetInline: 0,
    insetBlockStart: "-6.75%", // It is slightly taller to accommodate the hair
    insetBlockEnd: 0,
    zIndex: "-1",
});

const StyledPath = styled("path");
const StyledRect = styled("rect");

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
                viewBox="0 0 1384 786"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clipBlobs)">
                    <g opacity="0.45" filter="url(#filter0_f_545_107)">
                        <StyledPath
                            d="M1606.41 315.305C1680.87 393.411 1779.74 472.17 1766.8 572.769C1752.15 686.735 1657.71 780.321 1542.48 812.515C1431.42 843.542 1317.73 785.84 1213.9 727.237C1105.32 665.951 977.008 599.863 959.575 483.507C942.275 368.037 1037.7 272.057 1136.28 209.173C1213.71 159.785 1314.09 175.712 1408.65 197.059C1487.32 214.818 1551.29 257.476 1606.41 315.305Z"
                            css={{ fill: "rgb($green400)" }}
                        />
                    </g>
                    <g opacity="0.45" filter="url(#filter1_f_545_107)">
                        <StyledPath
                            d="M803.241 254.881C870.251 250.457 935.428 260.001 989.123 286.457C1043.73 313.363 1084.58 354.87 1107.53 404.808C1130.7 455.232 1132.66 512.246 1119.15 569.409C1105.17 628.541 1080.16 688.676 1029.23 735.987C977.788 783.768 908.558 822.348 836.497 831.969C768.216 841.086 712.369 807.909 653.994 786.085C604.409 767.549 563.284 742.297 521.699 714.286C470.306 679.668 388.798 660.198 381.579 602.593C374.408 545.365 445.664 493.832 487.499 441.373C525.136 394.178 558.251 344.119 613.938 311.227C671.159 277.43 737.571 259.217 803.241 254.881Z"
                            css={{ fill: "rgb($purple400)" }}
                        />
                    </g>
                    <g opacity="0.45" filter="url(#filter2_f_545_107)">
                        <StyledPath
                            d="M1251.31 428.262C1299.52 439.836 1348.29 456.302 1381.38 489.778C1414.37 523.157 1424.78 568.898 1433.84 612.929C1442.74 656.135 1447.39 700.417 1433.45 742.695C1419.3 785.57 1390.31 822.971 1354.33 853.955C1317.71 885.492 1274.76 911.999 1225.39 921.873C1175.94 931.763 1125.04 923.345 1077.02 909.417C1029.11 895.522 981.457 876.467 949.226 841.775C917.479 807.603 908.109 762.107 899.334 718.161C890.766 675.249 884.604 631.261 898.837 589.418C913.197 547.203 942.903 510.464 979.894 481.335C1016.53 452.489 1061.09 433.556 1108.55 424.276C1155.97 415.003 1204.6 417.046 1251.31 428.262Z"
                            css={{ fill: "rgb($blue400)" }}
                        />
                    </g>
                </g>
                <image
                    href="/images/headshot.png"
                    x="769"
                    y="0"
                    width={756}
                    height={1133}
                    clipPath="url(#clipHeadshot)"
                />
                <StyledRect
                    x="4"
                    y="54"
                    width="1376"
                    height="728"
                    strokeOpacity="0.1"
                    strokeWidth="8"
                    css={{ stroke: "rgb($gray900)", rx: "$radii$md" }}
                />
                <defs>
                    <filter
                        id="filter0_f_545_107"
                        x="607.531"
                        y="-173.429"
                        width="1510.42"
                        height="1344.62"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        />
                        <feGaussianBlur
                            stdDeviation="175"
                            result="effect1_foregroundBlur_545_107"
                        />
                    </filter>
                    <filter
                        id="filter1_f_545_107"
                        x="31.0762"
                        y="-96.1583"
                        width="1446.5"
                        height="1279.68"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        />
                        <feGaussianBlur
                            stdDeviation="175"
                            result="effect1_foregroundBlur_545_107"
                        />
                    </filter>
                    <filter
                        id="filter2_f_545_107"
                        x="540.359"
                        y="68.4203"
                        width="1251.92"
                        height="1207.76"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        />
                        <feGaussianBlur
                            stdDeviation="175"
                            result="effect1_foregroundBlur_545_107"
                        />
                    </filter>
                    <clipPath id="clipBlobs">
                        <StyledRect
                            y="50"
                            width="1384"
                            height="736"
                            fill="white"
                            css={{ rx: "$radii$md" }}
                        />
                    </clipPath>
                    <clipPath id="clipHeadshot">
                        <StyledRect
                            width="1384"
                            height="786"
                            fill="white"
                            css={{ rx: "$radii$md" }}
                        />
                    </clipPath>
                </defs>
            </StyledSVG>
        </IntroContainer>
    );
};

export default ProjectGrid;
