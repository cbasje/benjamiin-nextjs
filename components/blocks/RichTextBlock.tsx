import ReactMarkdown from "react-markdown";
import { RichTextBlock as RichTextBlockType } from "@/models/block";

const RichText = ({ body }: RichTextBlockType) => {
    return <ReactMarkdown>{body || ""}</ReactMarkdown>;
};

export default RichText;
