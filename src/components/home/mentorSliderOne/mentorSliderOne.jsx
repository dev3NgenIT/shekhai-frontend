import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Carousel from "./carousel";

export default function MentorSliderOne({ data }) {
  return (
    <section className="mt-16 w-full bg-[#F4FAFF] py-10 md:mt-[6.25rem] md:h-[44.813rem] md:pt-[7.5rem]">
      <div className="container-width relative flex flex-col items-center justify-end md:flex-row">
        <Image
          alt={data.image}
          src={data.image}
          width={529}
          height={581}
          className="absolute top-0 -left-[53px] hidden md:block"
        />

        <section className="w-full px-5 md:w-[37.5rem] md:p-0">
          <div className="flex w-full flex-col gap-y-5">
            <h1 className="text-3xl font-semibold text-title-one md:text-hero-headline/14">
              {data.title}
            </h1>
            <p className="text-lg text-[#898787] md:text-[22px]">
              {data.description}
            </p>
            <Button variant="default" className="self-start">
              <Link href="/courses">{data.button_text}</Link>
            </Button>
          </div>

          {/* <section className="w-[36.75rem]"> */}
          <Carousel features={data.features} />
          {/* </section> */}
        </section>
      </div>
    </section>
  );
}
