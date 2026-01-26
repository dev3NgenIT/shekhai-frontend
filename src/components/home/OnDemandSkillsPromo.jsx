import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function OnDemandSkillsPromo({ data }) {
  return (
    <section className="mx-auto mt-16 md:mt-[6.25rem]">
      <h1 className="text-center text-3xl font-semibold text-title-one md:text-hero-headline">
        {data?.title || "On-Demand Skills"}
      </h1>
      <hr className="mx-auto  mt-7 mb-6 h-[3px] w-[12.875rem] bg-stroke" />
      <p className="mx-auto w-[20rem] font-bold text-center text-black md:w-[47.375rem] md:text-xl">
        {data.subtitle}
      </p>
      <p className="mx-auto w-[20rem] text-center text-gray md:w-[47.375rem] md:text-xl">
        {data.description}
      </p>
      <div className="mx-auto mt-10 flex items-center justify-center">
        <Button variant="default" className="self-start">
          <Link href="/courses">Start Learning</Link>
        </Button>
      </div>
    </section>
  );
}
