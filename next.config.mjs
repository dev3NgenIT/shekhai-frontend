/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "localhost",
      "shekhai-server.onrender.com", // your API server domain
      "res.cloudinary.com",           // if you use Cloudinary
      "images.unsplash.com"           // if you use Unsplash
    ],
  },

  // Next.js default output is ".next" (do NOT change)
  // distDir: "build"   <-- remove this

  experimental: {
    appDir: true,
  },
};

export default nextConfig;
