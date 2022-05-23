import ReactMarkdown from 'react-markdown';

const RichText = ({ body }: { body?: string }) => {
	return <ReactMarkdown children={body || ''} />;
};

export default RichText;
