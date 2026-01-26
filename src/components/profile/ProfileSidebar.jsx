"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TiFolderDelete } from "react-icons/ti";
import { Button } from "../ui/button";

const links = [
  // {
  //   name: "Dashboard",
  //   href: "/dashboard",
  //   icon: AiOutlineHome,
  // },
  {
    name: "dashboard",
    href: "/dashboard",
    icon: AiOutlineHome,
    // icon: HiInboxArrowDown,
  },
  {
    name: "Lesson",
    href: "/lesson",
    icon: TiFolderDelete,
  },
  // {
  //   name: "Assignment",
  //   href: "/assignment",
  //   icon: BsCardChecklist,
  // },
  {
    name: "Webinar",
    href: "/webinar",
    icon: HiOutlineUserGroup,
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className={"sticky top-[5.5rem] max-h-[calc(100vh-90px)]"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={"text-xl font-normal"}>
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent className={"mt-4"}>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/profile/user${link.href}`}
                      className={cn(
                        "flex items-center gap-x-2 capitalize",
                        pathname === `/profile/user${link.href}`
                          ? "font-semibold text-base"
                          : "text-gray/900",
                      )}
                    >
                      <link.icon />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button
          variant={"outline"}
          className={
            "border-red-500 bg-transparent text-red-500 shadow-none hover:bg-red-500 hover:text-white"
          }
        >
          <LogOut />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
