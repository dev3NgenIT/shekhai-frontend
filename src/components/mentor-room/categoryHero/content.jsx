import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

export default function Content({ mentorData }) {
  // Extract the banner image from mentorData
  const data = mentorData?.section_one;
  return (
    <section className="mt-5 md:mt-0">
      <h1 className="text-3xl font-semibold text-[#181818] md:text-hero-headline md:leading-16">
        {data?.title || "Start Your Tailoring Journey Today"}
      </h1>

      <p className="mt-3 text-xl leading-[150%] text-[#898787]">
        {data?.short_description ||
          "Discover the secrets of perfect stitching, fitting, and garment creation from seasoned professionals."}
      </p>

      <div className="mt-6 flex items-center gap-x-3">
        <Image
          src="/mentor.png"
          alt="instructor image"
          width={60}
          height={60}
          className="size-[3.75rem] rounded-full bg-blue-300"
        />

        <div>
          <p className="text-lg leading-[100%] font-medium text-[#181818]">
            {data?.instructor_name || "Jane Doe"}
          </p>
          <p className="mt-1.5 flex items-center gap-x-1 text-sm text-gray">
            <FaStar className="size-4 text-[#234A96]" />
            {data?.instructor_rating}
          </p>
        </div>
      </div>

      <Button className="mt-6 rounded">
        <Link href={`/${data?.instructor_link}`}>Start Learning</Link>
      </Button>
    </section>
  );
}
