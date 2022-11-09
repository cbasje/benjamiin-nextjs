import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CaretDown } from "phosphor-react";

import { getLocaleLabel } from "@/lib/locale";
import { Locale } from "@/lib/types";
import { styled } from "@/stitches.config";

const SelectIcon = styled(Select.Icon, {
    verticalAlign: "text-bottom",
});

const LanguageSwitcher = ({
    locale,
    onLocaleChange,
}: {
    locale: string;
    onLocaleChange: (newLocale: Locale) => void;
}) => {
    return (
        <>
            <VisuallyHidden.Root>
                <Label.Root htmlFor="languageSwitcher">
                    Switch languages
                </Label.Root>
            </VisuallyHidden.Root>
            <Select.Root defaultValue={locale} onValueChange={onLocaleChange}>
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
                            <Select.Item key={`locale-${l}`} value={l} lang={l}>
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
        </>
    );
};

export default LanguageSwitcher;
