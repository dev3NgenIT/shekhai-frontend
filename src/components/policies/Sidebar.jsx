"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { title: "refund policy", href: "/refund-policy" },
  { title: "privacy policy", href: "/privacy-policy" },
  { title: "terms & conditions", href: "/terms-and-conditions" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[24rem] shrink-0 flex-col divide-y-2 self-stretch border-[#D9D9D9] bg-[#EDEDED] py-[50px] md:flex">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "w-full bg-[#F6F6F6] py-2 pl-[83px] text-xl leading-[170%] text-[#898787] capitalize",
            link.href === pathname
              ? "bg-[#F6F6F6] text-[#234A96]"
              : "bg-transparent",
          )}
        >
          {link.title}
        </Link>
      ))}
    </aside>
  );
}
