import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function NormalCard({ contentFirst = true }) {
  return (
    <div
      className={cn(
        "flex",
        contentFirst ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse",
      )}
    >
      <div className="relative">
        <Link href="/courses/smart-home-automation">
          <Image
            alt="course image"
            src="/home-automation.png"
            width={306}
            height={238}
            className="h-[14.875rem] w-[355px] md:w-[19.125rem]"
          />
        </Link>
      </div>

      <div className="h-[14.875rem] w-[355px] bg-[#f6f7f9] p-6 md:w-[17.625rem]">
        <Link
          href="/courses/smart-home-automation"
          className="text-[16px] font-medium text-title-one"
        >
          Smart Home Automation
        </Link>

        <p className="mt-3.5 line-clamp-6 text-sm text-gray">
          Explore connected devices and learn to automate your home for
          convenience, security, and energy savings. Discover smart lighting,
          thermostats, security systems, and voice control to create smart
          living experience.
        </p>
        <Link
          href="/courses/smart-home-automation"
          className="mt-1.5 ml-auto hidden w-fit text-title-one md:block"
        >
          <IoIosArrowForward className="size-7 rounded-full border border-base p-1 text-base hover:bg-title-one hover:text-white" />
        </Link>
      </div>
    </div>
  );
}
