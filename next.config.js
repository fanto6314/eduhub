/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, async redirects() {
        return [{
            source: '/', destination: '/app', permanent: true,
        },]
    }, experimental: {
        outputStandalone: true,
    },
}

module.exports = nextConfig
