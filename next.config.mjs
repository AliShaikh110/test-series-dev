/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // port: "",
        // pathname: "",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        // port: "",
        // pathname: "",
      },
      {
        protocol: "https",
        hostname: "cdn.testbook.com",
        // port: "",
        // pathname: "",
      },
      {
        protocol: "https",
        hostname: "cdn.dribbble.com",
        // port: "",
        // pathname: "",
      },
    ],
  },
};

export default nextConfig;
