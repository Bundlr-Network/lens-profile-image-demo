/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    nextScriptWorkers: true,
    esmExternals: false,
    optimizeCss: true
  }
}

module.exports = nextConfig
