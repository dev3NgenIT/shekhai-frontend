import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import Content from "./content";

export default function BannerCTA() {
  return (
    <section
      className={`container-width mt-[6.25rem] flex h-[17.5rem] items-center justify-between rounded border-2 border-[#3AAEF6] bg-[#DDF1FF] [background-image:_url("/round-mesh.png")] px-4 md:pr-11 md:pl-[4.875rem]`}
    >
      <Content />

      <div className="flex items-end justify-between md:items-center">
        <Image
          src="/multiple-star.png"
          alt="stars icon"
          width={60}
          height={78}
          className="mb-16 hidden md:block"
        />

        <Image
          src="/mentor.png"
          alt="mentor image"
          width={234}
          height={327}
          className="hidden md:block"
        />

        <Button
          variant="outline"
          className="size-10 mt-[12rem] self-end rounded-full bg-transparent p-0 md:mb-11 md:ml-[4.875rem]"
        >
          <IoIosArrowForward className="size-6" />
        </Button>
      </div>
    </section>
  );
}
