import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "theballinleague.fr" }], destination: "https://www.theballinleague.fr/:path*", permanent: true },
      { source: "/reservation", destination: "/reservation/tbl-02-the-throne", permanent: false },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Photos des joueurs téléversées depuis l'espace administrateur (Supabase Storage)
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};
export default nextConfig;
