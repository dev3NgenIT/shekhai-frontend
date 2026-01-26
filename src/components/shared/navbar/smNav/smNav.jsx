"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";

const withChildLinks = [
  {
    title: "smart home automation",
    href: "/courses/smart-home-automation",
    children: [
      {
        title: "lighting",
        href: "/courses/smart-home-automation?category=smart-lighting",
      },
      {
        title: "thermostats",
        href: "/courses/smart-home-automation?category=smart-thermostats",
      },
      {
        title: "security",
        href: "/courses/smart-home-automation?category=smart-security",
      },
      {
        title: "voice control",
        href: "/courses/smart-home-automation?category=smart-voice-control",
      },
    ],
  },
  {
    title: "programming",
    href: "/courses/programming",
    children: [
      {
        title: "Programming Fundamentals",
        href: "/courses/programming?category=programming-fundamentals",
      },
      {
        title: "Learn C++",
        href: "/courses/programming?category=learn-cpp",
      },
      {
        title: "JavaScript Fundamentals",
        href: "/courses/programming?category=javascript-fundamentals",
      },
      {
        title: "Complete Web Development Bootcamp",
        href: "/courses/programming?category=complete-web-development-bootcamp",
      },
    ],
  },
];

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "courses",
    href: "/courses",
  },
  // {
  //   title: "project showcase",
  //   href: "/project-showcase",
  // },
  {
    title: "Mentor Room",
    href: "/mentor-room",
  },
  {
    title: "webinar room",
    href: "/webinar-room",
  },
  {
    title: "contact",
    href: "/contact-us",
  },
  {
    title: "community",
    href: "/community",
  },
];

export default function SmNav() {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <FaBars
        className="block text-2xl md:hidden"
        onClick={() => setOpen(true)}
      />

      <DrawerContent className={"z-[100] h-screen w-screen"}>
        <ul className="mt-10 min-h-[10rem] w-[30rem] p-4">
          <li>
            {withChildLinks.map((el) => (
              <div
                key={el.href}
                className="mt-4 w-fit cursor-pointer rounded px-2 text-[#181818]/80 capitalize first-of-type:mt-0"
              >
                <Link
                  href={el.href}
                  className="hover:text-base"
                  onClick={onClose}
                >
                  {el.title}
                </Link>

                <ul className="flex flex-col">
                  {el.children.map((child) => (
                    <li
                      key={child.href}
                      onClick={onClose}
                      className="w-fit cursor-pointer rounded px-2 text-sm text-[#181818]/70 capitalize hover:text-base"
                    >
                      <Link href={child.href}>{child.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </li>

          <div className="mt-4">
            {links.map((el) => (
              <li
                key={el.href}
                onClick={onClose}
                className="w-fit cursor-pointer rounded px-2 text-[#181818]/80 capitalize hover:text-base"
              >
                <Link href={el.href}>{el.title}</Link>
              </li>
            ))}
          </div>
        </ul>

        <Button
          variant="outline"
          className={"mx-auto mt-4 w-fit"}
          onClick={onClose}
        >
          Cancel
        </Button>
      </DrawerContent>
    </Drawer>
  );
}
