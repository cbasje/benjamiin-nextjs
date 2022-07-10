/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com', 'localhost:3000', 'i.scdn.co'],
		deviceSizes: [320, 420, 768, 1024, 1200],
	},
	experimental: {
		legacyBrowsers: false,
		newNextLinkBehavior: true,
		images: {
			allowFutureImage: true,
		},
	},
};
