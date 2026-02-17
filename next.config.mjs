/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'shekhai-server.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'shekhai.ngengroup.org',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'shekhai-frontend.vercel.app',
      },
    ],
  },

  // Next.js default output is ".next" (do NOT change)
  // distDir: "build"   <-- remove this
};

export default nextConfig;
