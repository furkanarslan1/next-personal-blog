import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", //  Cloudinary domaini eklendi
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profil resimleri
        port: "",
        pathname: "/**", // Bu host altındaki tüm yollara izin ver
      },
    ],
  },
};

export default nextConfig;
