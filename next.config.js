/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
		deviceSizes: [320, 420, 768, 1024, 1200],
	},
};
