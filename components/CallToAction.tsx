import Error from "next/error";
import { ArrowUpRight } from "phosphor-react";

import { Home } from "@/lib/types";
import { Button, Flex, styled } from "@/stitches.config";

const CTAContainer = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const StyledSVG = styled("svg", {
    position: "absolute",
    insetInline: 0,
    insetBlockStart: 0,
    insetBlockEnd: 0,
    zIndex: "-1",
});

const StyledPath = styled("path");
const StyledRect = styled("rect");

const CallToAction = ({ homepage }: { homepage: Home }) => {
    if (!homepage) return <Error statusCode={404} />;

    return (
        <CTAContainer>
            <StyledSVG
                viewBox="0 0 1384 658"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_545_173)">
                    <g opacity="0.45" filter="url(#filter0_f_545_173)">
                        <StyledPath
                            d="M1060.26 130.736C1117.32 190.601 1193.1 250.967 1183.19 328.071C1171.95 415.422 1099.57 487.151 1011.25 511.826C926.132 535.607 838.992 491.381 759.413 446.465C676.19 399.492 577.844 348.838 564.483 259.656C551.223 171.153 624.359 97.5883 699.922 49.3905C759.267 11.5368 836.205 23.7441 908.682 40.1057C968.978 53.7175 1018.01 86.4131 1060.26 130.736Z"
                            css={{ fill: "rgb($green400)" }}
                        />
                    </g>
                    <g opacity="0.45" filter="url(#filter1_f_545_173)">
                        <StyledPath
                            d="M444.663 84.4243C496.023 81.0334 545.979 88.3486 587.134 108.626C628.988 129.248 660.299 161.061 677.887 199.337C695.647 237.984 697.151 281.683 686.792 325.496C676.076 370.819 656.907 416.909 617.87 453.171C578.446 489.793 525.384 519.363 470.152 526.737C417.818 533.725 375.014 508.296 330.271 491.569C292.267 477.362 260.747 458.007 228.873 436.538C189.483 410.005 127.011 395.082 121.478 350.93C115.981 307.068 170.596 267.57 202.66 227.362C231.508 191.189 256.889 152.821 299.57 127.611C343.428 101.707 394.33 87.7473 444.663 84.4243Z"
                            css={{ fill: "rgb($purple400)" }}
                        />
                    </g>
                    <g opacity="0.45" filter="url(#filter2_f_545_173)">
                        <StyledPath
                            d="M788.093 217.313C825.042 226.184 862.418 238.804 887.779 264.462C913.067 290.046 921.046 325.104 927.994 358.852C934.812 391.968 938.38 425.908 927.69 458.312C916.85 491.174 894.628 519.84 867.053 543.588C838.985 567.76 806.066 588.076 768.224 595.644C730.323 603.224 691.308 596.772 654.503 586.098C617.782 575.447 581.259 560.843 556.556 534.253C532.223 508.061 525.041 473.19 518.316 439.508C511.748 406.618 507.026 372.903 517.935 340.832C528.941 308.476 551.709 280.317 580.061 257.991C608.137 235.882 642.296 221.371 678.674 214.257C715.019 207.151 752.288 208.716 788.093 217.313Z"
                            css={{ fill: "rgb($blue400)" }}
                        />
                    </g>
                </g>
                <StyledRect
                    x="4"
                    y="4"
                    width="1376"
                    height="650"
                    strokeOpacity="0.1"
                    strokeWidth="8"
                    css={{ stroke: "rgb($gray900)", rx: "$radii$md" }}
                />
                <defs>
                    <filter
                        id="filter0_f_545_173"
                        x="262.916"
                        y="-275.597"
                        width="1221.15"
                        height="1094.08"
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
                            stdDeviation="150"
                            result="effect1_foregroundBlur_545_173"
                        />
                    </filter>
                    <filter
                        id="filter1_f_545_173"
                        x="-178.908"
                        y="-216.373"
                        width="1172.16"
                        height="1044.3"
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
                            stdDeviation="150"
                            result="effect1_foregroundBlur_545_173"
                        />
                    </filter>
                    <filter
                        id="filter2_f_545_173"
                        x="211.438"
                        y="-90.2305"
                        width="1023.03"
                        height="989.173"
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
                            stdDeviation="150"
                            result="effect1_foregroundBlur_545_173"
                        />
                    </filter>
                    <clipPath id="clip0_545_173">
                        <rect width="1384" height="658" rx="16" fill="white" />
                    </clipPath>
                </defs>
            </StyledSVG>

            <Button
                as="a"
                href="mailto:Sebastiaan Benjamins <sebas@benjami.in>"
                variant="black"
                size="lg"
                css={{
                    mixBlendMode: "multiply",
                }}
            >
                <Flex
                    css={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "$1",
                    }}
                >
                    <span>{homepage.callToAction ?? "Let&apos;s talk"}</span>
                    <ArrowUpRight size={32} weight="bold" />
                </Flex>
            </Button>
        </CTAContainer>
    );
};

export default CallToAction;
