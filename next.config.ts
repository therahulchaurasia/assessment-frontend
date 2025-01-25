import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://assessment-backend-y7x7.onrender.com/api/:path*",
      },
    ]
  },
}

export default nextConfig
