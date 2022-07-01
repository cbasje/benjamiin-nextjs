import { NextRequest, NextResponse } from 'next/server';

// only run middleware on home page
export const config = {
	matcher: '/',
};

export default function middleware(req: NextRequest) {
	const languages = req.headers.get('accept-language');
	const locale = languages?.split(',')?.[0].split('-')?.[0] || 'en';

	// Rewrite the path (`/`) to the localized page (pages/[locale])
	req.nextUrl.pathname = `/${locale}`;
	return NextResponse.rewrite(req.nextUrl);
}
