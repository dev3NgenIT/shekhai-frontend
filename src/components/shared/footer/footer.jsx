import Link from "next/link";
import CompanyInfo from "./companyInfo";
import Links from "./links";
import Socials from "./socials";

const footerLinks = [
  {
    title: "pages",
    links: [
      { title: "Courses", href: "/courses" },
      { title: "Mentor Room", href: "/mentor-room" },
      // { title: "Project Showcase", href: "/project-showcase" },
      { title: "Webinar", href: "/webinar-room" },
      { title: "Community", href: "/community" },
    ],
  },
  {
    title: "links",
    links: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Refund Policy", href: "/refund-policy" },
      { title: "Terms & Conditions", href: "/terms-and-conditions" },
      { title: "About Us", href: "/about-us" },
      { title: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "important links",
    links: [
      { title: "Login", href: "/login" },
      { title: "register", href: "/register" },
      { title: "Contact Us", href: "/contact-us" },
    ],
  },
];

import axios from "axios";

// If this is a server component
async function getHomepageData() {
  try {
    const response = await axios.get("https://shekhai-server.onrender.com/api/v1/homepage");
    return response.data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}
export default async function Footer() {
  const homepageData = await getHomepageData();
  const footerData = homepageData?.data?.footer || {};
  return (
    <footer className="mt-[6.25rem] bg-white px-0 pb-6 md:px-[7.375rem]">
      <div className="grid grid-cols-2 items-start gap-y-5 border-y border-t-base border-b-[#f1f1f3] px-5 py-6 md:grid-cols-5 md:px-10 md:py-16">
        <CompanyInfo data={footerData} />

        {footerLinks.map((links, index) => (
          <Links key={index} {...links} />
        ))}

        {/* <Links />
        <Links />
        <Links /> */}

        <Socials />
      </div>

      {/* Copyright */}
      <p className="mt-5 text-center font-hanken_grotesk text-lg text-[#656567] md:mt-9">
        {footerData.copyright}
      </p>

      <div className="mt-2 flex items-center justify-between font-hanken_grotesk md:mt-0">
        <Link href="/privacy-policy" className="text-[#656567]">
          Privacy & Policy
        </Link>
        <Link href="/terms-and-conditions" className="text-[#656567]">
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
}
