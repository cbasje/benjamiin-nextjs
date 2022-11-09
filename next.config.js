/** @type {import('next').NextConfig} */
module.exports = {
    swcMinify: false,
    images: {
        remotePatterns: [
            { hostname: "cdn.sanity.io" },
            { hostname: "res.cloudinary.com" },
            { hostname: "i.scdn.co" },
        ],
    },
    // typescript: {
    //     ignoreBuildErrors: process.env.VERCEL_ENV === "production",
    // },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        legacyBrowsers: false,
        newNextLinkBehavior: true,
    },
};
