"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({ link, children }) {
  const pathname = usePathname();


  return (
    <Link
      href={link.href}
      className="flex items-center gap-x-2 text-sm text-gray/900"
    >
      {children}
      {link.name}
    </Link>
  );
}
