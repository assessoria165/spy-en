/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "pps.whatsapp.net",
      "primary-production-aac6.up.railway.app",
      "blob.v0.dev",
      "images.converteai.net",
      "cdn.converteai.net",
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/whatsapp/:path*",
        destination: "https://primary-production-aac6.up.railway.app/webhook/:path*",
      },
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.vercel.app"],
    },
  },
}
