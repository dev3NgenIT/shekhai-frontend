"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// const withChildLinks = [
//   {
//     title: "smart home automation",
//     href: "/courses/smart-home-automation",
//     children: [
//       {
//         title: "lighting",
//         href: "/courses/smart-home-automation?category=smart-lighting",
//       },
//       {
//         title: "thermostats",
//         href: "/courses/smart-home-automation?category=smart-thermostats",
//       },
//       {
//         title: "security",
//         href: "/courses/smart-home-automation?category=smart-security",
//       },
//       {
//         title: "voice control",
//         href: "/courses/smart-home-automation?category=smart-voice-control",
//       },
//     ],
//   },
//   {
//     title: "programming",
//     href: "/courses/programming",
//     children: [
//       {
//         title: "Programming Fundamentals",
//         href: "/courses/programming?category=programming-fundamentals",
//       },
//       {
//         title: "Learn C++",
//         href: "/courses/programming?category=learn-cpp",
//       },
//       {
//         title: "JavaScript Fundamentals",
//         href: "/courses/programming?category=javascript-fundamentals",
//       },
//       {
//         title: "Complete Web Development Bootcamp",
//         href: "/courses/programming?category=complete-web-development-bootcamp",
//       },
//     ],
//   },
// ];

// const links = [
//   {
//     title: "farming",
//     href: "/courses/farming",
//   },
//   {
//     title: "cooking",
//     href: "/courses/cooking",
//   },
//   {
//     title: "hacking",
//     href: "/courses/hacking",
//   },
// ];

export function CenterLInks() {
  return (
    <NavigationMenu className={"hidden md:block"}>
      <NavigationMenuList>

        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="/courses">Courses</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/* <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="/project-showcase"></Link>
          </NavigationMenuLink> */}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="/mentor-room">Mentor Room</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="/webinar-room">Webinar Room</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="/contact-us">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="/community">Community</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
