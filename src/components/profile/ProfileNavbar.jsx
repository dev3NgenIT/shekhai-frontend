"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";

export default function ProfileNavbar() {
  const pathname = usePathname();

  return (
    <p className={"flex items-center gap-x-1 md:hidden"}>
      <SidebarTrigger />
      <span className="text-sm capitalize">{pathname}</span>
    </p>
  );
}
