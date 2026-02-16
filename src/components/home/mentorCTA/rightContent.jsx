import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa6";

export default function RightContent({ data }) {
  return (
    <div className="relative mt-3 flex flex-col items-center justify-center self-center rounded-2xl border border-dashed border-gray p-4 pb-12 md:mt-0 md:ml-12 md:h-[239px] md:w-[469px] md:p-0">
      <FaUserPlus className="h-[3.5rem] w-[4rem] text-stroke" />
      <h3 className="mt-6 text-2xl font-medium text-white">
        {data.journey_text}
      </h3>

      {/* <Link href={data.button_link || '/mentor-room'}> */}
      <Link href={'/mentor-room'}>
        <Button
          variant="secondary"
          className="relative isolate mt-5 overflow-hidden rounded-sm [font-size:_14px] text-base before:absolute before:-top-full before:-left-2/4 before:-z-1 before:h-[200%] before:w-[200%] before:-rotate-45 before:bg-[linear-gradient(0deg,_transparent,_transparent_30%,_#a4a4a4)] before:opacity-0 before:transition-all before:duration-[0.5s] before:ease-[ease] before:content-[''] hover:bg-white hover:before:translate-y-[200%] hover:before:-rotate-45 hover:before:opacity-100"
        >
          {data.button_text}
        </Button>
      </Link>

      <small className="absolute right-3 bottom-3 text-xs text-white underline underline-offset-5 md:right-6">
        <sup className="-top-1 text-sm">*</sup>Terms and Conditions
      </small>

      <Image
        src="/arrow.png"
        alt="arrow"
        width={161}
        height={85}
        className="absolute top-10 -left-24 text-white"
      />
    </div>
  );
}
