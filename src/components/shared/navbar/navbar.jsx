// "use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { CenterLInks } from "./centerLinks";
import SmNav from "./smNav/smNav";


export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-white px-3 py-4 md:px-[7.5rem]">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={180}
          height={60}
          priority
          className="h-[37px] w-[111px] md:h-[60px] md:w-[180px]"
        />
      </Link>

      <CenterLInks />

      <div className="flex items-center justify-between gap-3">
        {/* <Link
          href={"/courses"}
          className="hidden rounded-full border-2 border-base p-1 text-lg text-base md:block"
        >
          <IoSearch />
        </Link> */}

        <Link href={"/profile/user/dashboard"}>
          <FaRegUserCircle className="text-[1.8rem] text-base" />
        </Link>

        <Link href="/join-studybit">
          <Button className="flex flex-col py-2 md:h-[3.75rem] md:px-6">
            <span className="leading-4 font-semibold md:text-[1.125rem]">
              Study Bit
            </span>
            <span className="hidden text-[0.625rem] font-bold md:block">
              Which skill to learn?
            </span>
          </Button>
        </Link>

        <SmNav />
      </div>
    </nav>
  );
}
