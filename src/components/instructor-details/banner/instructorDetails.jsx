import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function InstructorDetails() {
  return (
    <section className="full-bleed-padding flex flex-col-reverse items-center justify-between bg-title-one px-4 py-6 md:h-[31.25rem] md:flex-row md:px-0 md:py-0">
      <div className="mt-6 w-full px-4 text-white md:mt-0 md:px-0">
        <Badge className="rounded-sm border-0 bg-stroke p-2 text-button">
          Meet Your Mentor
        </Badge>

        <h1 className="mt-4 text-5xl">Wade Warren</h1>
        <h3 className="mt-4 text-2xl">CEO, NGen IT Ltd.</h3>

        <hr className="mt-[1.625rem] mb-6 w-[12.875rem] bg-white md:w-[27.25rem]" />

        <p className="max-w-[39rem]">
          Wade Warren is a visionary leader and seasoned innovator with over 15
          years of experience in the tech industry. As the CEO of Abstergo Ltd.,
          a globally recognized name in software innovation and digital
          solutions, Wade has led groundbreaking projects in game development,
          enterprise software, and emerging technologies.
        </p>
      </div>

      <Image
        src="/chef-banner-image.png"
        alt="mentor image"
        width={370}
        height={395}
        className="h-[395px] w-[370px] object-cover md:rounded-md"
      />
    </section>
  );
}
