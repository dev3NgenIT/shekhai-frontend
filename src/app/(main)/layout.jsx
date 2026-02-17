
import { Hanken_Grotesk, Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from 'react-hot-toast';
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import NotifyBar from "@/components/Shared/NotifyBar/notifyBar";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const grotesk = Hanken_Grotesk({
  variable: "--font-hanken_grotesk",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Shekhai || Online Learning in Bangladesh",
  description:
    "Join Shekhai to access online courses, tutorials, and educational content. Learn anytime, anywhere in Bangladesh.",
  keywords: [
    "Shekhai",
    "Online Learning",
    "Bangladesh",
    "Education",
    "Courses",
    "Tutorials",
    "E-learning",
    "Skill Development",
  ],
  metadataBase: new URL("https://shekhai.ngengroup.org/"),
  openGraph: {
    title: "Shekhai || Online Learning in Bangladesh",
    description:
      "Explore online courses and tutorials at Shekhai. Learn new skills and grow your knowledge from anywhere in Bangladesh.",
    url: "https://shekhai.ngengroup.org/",
    siteName: "Shekhai",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        alt: "Shekhai || Online Learning in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shekhai || Learn Online in Bangladesh",
    description:
      "Access online courses, tutorials, and educational content on Shekhai. Learn new skills with ease!",
    images: ["/opengraph-image.jpg"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="relative">
      <body
        className={`${poppins.className} ${grotesk.variable} antialiased after:absolute after:inset-0 after:-z-[1] after:bg-[url('/hero-mesh.png')] after:opacity-75 after:content-['']`}
      >
        <NotifyBar />
        <Navbar />
        {children}
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4CAF50',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#f44336',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
