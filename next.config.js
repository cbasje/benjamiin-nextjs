/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ["res.cloudinary.com", "cdn.sanity.io", "i.scdn.co"],
        deviceSizes: [320, 420, 768, 1024, 1200],
    },
    experimental: {
        legacyBrowsers: false,
        newNextLinkBehavior: true,
    },
};
