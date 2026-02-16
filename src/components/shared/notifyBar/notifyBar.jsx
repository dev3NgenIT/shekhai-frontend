"use client";

import { useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { LiaFacebook } from "react-icons/lia";
import { MdOutlinePhone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { SiInstagram } from "react-icons/si";

export default function NotifyBar() {
  const [showNotifyBar, setShowNotifyBar] = useState(true);
  return (
    showNotifyBar && (
      <section className="flex w-full items-center justify-between bg-text-dark px-3 py-3.5 text-white md:px-[7.5rem]">
        <p className="flex w-fit items-center rounded-full border border-white px-2.5 py-1 text-sm md:text-body">
          Get Eid Special 50% Off{" "}
          <BsStars className="ml-2 size-5 text-[#FFE500]" />
        </p>

        <div className="hidden items-center gap-x-10 md:flex">
          <div className="flex items-center gap-x-1.5">
            <MdOutlinePhone className="text-xl" />
            (603) 555-0123
          </div>

          <div className="flex items-center gap-x-1.5">
            <IoMailOutline className="text-xl" />
            shekhai@example.com
          </div>
        </div>

        <div className="flex items-center gap-x-[70px]">
          <div className="hidden items-center gap-x-2.5 md:flex">
            Follow us on
            <p className="flex items-center gap-x-2 text-lg">
              <LiaFacebook className="text-2xl" />
              <SiInstagram />
              <FaXTwitter />
              <FaThreads />
            </p>
          </div>

          <RxCross1
            className="cursor-pointer text-xl"
            onClick={() => setShowNotifyBar(false)}
          />
        </div>
      </section>
    )
  );
}