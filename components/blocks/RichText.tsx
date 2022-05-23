import ReactMarkdown from 'react-markdown';

const RichText = ({ body }: { body?: string }) => {
	return <ReactMarkdown>{body || ''}</ReactMarkdown>;
};

export default RichText;
