"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/courses", label: "Courses" },
  { href: "/mentor-room", label: "Mentor Room" },
  { href: "/webinar-room", label: "Webinar Room" },
  { href: "/contact-us", label: "Contact" },
  { href: "/community", label: "Community" },
  { href: "/live-sessions", label: "Live Sessions" },
];

export function CenterLinks() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList className="gap-1">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "relative px-4 py-2 text-sm font-medium transition-all duration-200",
                "hover:text-blue-600 dark:hover:text-blue-400",
                isActive(item.href) && [
                  "text-green-600 dark:text-blue-400",
                  "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5",
                  "after:bg-gradient-to-r  after:to-green-600",
                  "after:content-[''] after:animate-fadeIn"
                ]
              )}
              asChild
            >
              <Link href={item.href}>
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}