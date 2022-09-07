import { useRouter } from "next/router";

import { getLocaleLabel } from "@/lib/locale";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";

import { Locale } from "@/lib/types";

import SpotifyPlayer from "./SpotifyPlayer";
import { styled } from "@/stitches.config";
import { CaretDown } from "phosphor-react";

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
        <nav>
            <ul>
                <li>© Sebastiaan Benjamins, {new Date().getFullYear()}</li>
                <li>
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
                </li>
            </ul>
            <ul>
                <li>
                    <SpotifyPlayer />
                </li>
            </ul>
        </nav>
    );
};

export default Footer;
