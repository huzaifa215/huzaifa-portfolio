import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.arqamtahir.com" }],
        destination: "https://arqamtahir.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
