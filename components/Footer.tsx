import { useRouter } from "next/router";

import { getLocaleLabel } from "@/lib/locale";

import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { Locale } from "@/lib/types";

import { styled } from "@/stitches.config";
import { CaretDown } from "phosphor-react";
import SpotifyPlayer from "./SpotifyPlayer";

const StyledFooter = styled("footer", {
    width: "100vw",
    padding: "$2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& > *": {
        width: "100%",
        maxWidth: "1024px",
    },
});

const StyledAside = styled("aside", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

const StyledUl = styled("ul", {
    margin: 0,
    listStyle: "none",
    display: "flex",
    maxWidth: "30%",
    position: "relative",
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

const StyledLi = styled("li", {});

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
