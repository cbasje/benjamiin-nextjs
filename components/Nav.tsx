import Link from "next/link";
import { useRouter } from "next/router";

import { Locale } from "@/lib/types";

const Nav = () => {
    const router = useRouter();
    const locale = router.query.locale as Locale;

    return (
        <nav>
            <ul>
                <li>
                    <Link href={"/[locale]"} as={`/${locale}`}>
                        Sebastiaan Benjamins
                    </Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link
                        href={"mailto:Sebastiaan Benjamins <sebas@benjami.in>"}
                    >
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
