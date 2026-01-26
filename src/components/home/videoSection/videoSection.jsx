import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BsTriangleFill } from "react-icons/bs";

export default function VideoSection() {
  return (
    <section className="container-width mt-16 md:mt-[6.25rem]">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-title-one md:text-hero-headline">
          Your Learning Journey <br />
          <span className="text-title-two">Starts with Shekhai</span>
        </h1>

        <Link href="/courses">
          <Button
            variant="outline"
            className="mt-4 text-lg text-[#181818] md:mt-10"
          >
            Start Learning
          </Button>
        </Link>
      </div>

      <div className="relative mt-8 w-full md:mt-[4.375rem] md:h-[500px]">
        <Image
          src="/video-thumbnail.png"
          alt="video thumbnail"
          width={1200}
          height={500}
          className=""
        />

        <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#DB2B42] md:size-20">
          <BsTriangleFill className="rotate-90 text-2xl text-white md:text-3xl" />
        </span>
      </div>
    </section>
  );
}
