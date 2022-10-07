import config from "@/sanity.config";
import { NextStudio } from "next-sanity/studio";

export default function StudioPage() {
    // Loads the Studio, with all the needed neta tags and global CSS reqiired for it to render correctly
    return <NextStudio config={config} />;
}
