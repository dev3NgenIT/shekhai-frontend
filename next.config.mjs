/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "localhost",
      "shekhai-server.onrender.com", // your API server domain
      "shekhai.ngengroup.org", // your API server domain
      "res.cloudinary.com",           // if you use Cloudinary
      "images.unsplash.com" ,
      "https://shekhai-frontend.vercel.app",
    ],
  },

  // Next.js default output is ".next" (do NOT change)
  // distDir: "build"   <-- remove this

  experimental: {
    appDir: true,
  },
};

export default nextConfig;
