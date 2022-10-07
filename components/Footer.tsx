import { useRouter } from "next/router";

import { getLocaleLabel } from "@/lib/locale";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";

import { Locale } from "@/lib/types";

import SpotifyPlayer from "./SpotifyPlayer";
import { styled } from "@/stitches.config";
import { CaretDown } from "phosphor-react";

const StyledFooter = styled("footer", {
    width: "100vw",
    padding: "$1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const StyledAside = styled("aside", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "1024px",
    background: "rgba(26,26,26,.8)",
    boxShadow: "0 6px 20px rgb(0 0 0 / 8%)",
    WebkitBackdropFilter: "blur(25px)",
    backdropFilter: "blur(25px)",
    borderRadius: "12px",
});

const StyledUl = styled("ul", {
    margin: 0,
    listStyle: "none",
    position: "relative",
    display: "flex",
    alignItems: "center",

    variants: {
        side: {
            left: {
                padding: 0,
                justifyContent: "flex-start",
                gap: 16,
            },
            right: {
                justifyContent: "flex-end",
                gap: 0,
                padding: 8,
            },
        },
    },
});

const StyledLi = styled("li", {
    "&:hover .popup": {
        opacity: 1,
        visibility: "visible",
    },
    "& .popup": {
        bottom: 40,
        left: "50%",
        transform: "translate(-50%)",
        padding: "2px 8px",
        flexDirection: "column",
        justifyContent: "center",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "20px",
        textAlign: "center",
        letterSpacing: "-.035em",
        whiteSpace: "nowrap",
        background: "#302f2f",
        border: "1px solid #302f2f",
        borderRadius: 6,
        transition:
            "opacity .2s cubic-bezier(.33,1,.68,1),visibility .2s cubic-bezier(.33,1,.68,1)",

        position: "absolute",
        display: "flex",
        alignItems: "center",
        color: "#efece6",
        boxShadow: "0 6px 20px rgb(0 0 0 / 8%)",
        WebkitBackdropFilter: "blur(25px)",
        backdropFilter: "blur(25px)",
        opacity: 0,
        visibility: "hidden",
    },

    "& .link": {
        display: "flex",
        padding: "8px 16px",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        zIndex: 1,
        textAlign: "center",
        letterSpacing: "-.01em",
        color: "hsla(40,22%,92%,.7)",
        transition: "color .6s cubic-bezier(.23,1,.32,1)",
    },
});

const SelectIcon = styled(Select.Icon, {
    verticalAlign: "text-bottom",
});

// export interface FooterProps {}

const Footer = () => {
    const router = useRouter();
    const locale = router.query.locale as Locale;

    const handleLocaleChange = (newLocale: Locale) => {
        router.push({
            pathname: "/[locale]",
            query: {
                locale: newLocale,
            },
        });
    };

    return (
        <StyledFooter>
            <StyledAside>
                <StyledUl side="left">
                    <StyledLi>
                        © Sebastiaan Benjamins, {new Date().getFullYear()}
                    </StyledLi>
                    <StyledLi>
                        <VisuallyHidden.Root>
                            <Label.Root htmlFor="languageSwitcher">
                                Switch languages
                            </Label.Root>
                        </VisuallyHidden.Root>
                        <Select.Root
                            defaultValue={locale}
                            onValueChange={handleLocaleChange}
                        >
                            <Select.Trigger>
                                <Select.Value />
                                <SelectIcon asChild>
                                    <CaretDown size="1rem" weight="bold" />
                                </SelectIcon>
                            </Select.Trigger>

                            <Select.Content>
                                <Select.ScrollUpButton />
                                <Select.Viewport>
                                    {Object.values(Locale).map((l) => (
                                        <Select.Item
                                            key={`locale-${l}`}
                                            value={l}
                                            lang={l}
                                        >
                                            <Select.ItemText>
                                                {getLocaleLabel(l)}
                                            </Select.ItemText>
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Viewport>
                                <Select.ScrollDownButton />
                            </Select.Content>
                        </Select.Root>
                    </StyledLi>
                </StyledUl>
                <StyledUl side="right">
                    <StyledLi>
                        <SpotifyPlayer />
                    </StyledLi>
                </StyledUl>
            </StyledAside>
        </StyledFooter>
    );
};

export default Footer;
