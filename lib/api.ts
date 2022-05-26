import qs from 'qs';

export function getStrapiURL(path: string = ''): string {
	return `${
		process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
	}${path}`;
}

export async function fetchAPI<T = any>(
	path: string,
	urlParamsObject = {},
	options = {}
) {
	// Merge default and user options
	const mergedOptions = {
		headers: {
			'Content-Type': 'application/json',
		},
		...options,
	};

	// TODO: Maybe faster way of doing things?
	const queryString = qs.stringify({ ...urlParamsObject, locale: 'all' });
	const requestUrl = `${getStrapiURL(
		`/api${path}${queryString ? `?${queryString}` : ''}`
	)}`;

	const response = await fetch(requestUrl, mergedOptions);

	// Handle response
	if (!response.ok) {
		console.error(response.statusText, response.url);
		throw new Error(`An error occured please try again`);
	}

	return (await response.json()) as { data: T };
}
