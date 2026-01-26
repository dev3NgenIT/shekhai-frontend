import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Content({ mentorData }) {
  const cta = mentorData?.cta_section;
  return (
    <div className="w-[437px] p-4 md:ml-[22rem] md:p-0">
      <h1 className="font-hanken_grotesk text-3xl font-semibold md:text-[41px] md:leading-12">
        {cta?.title.slice(0, 13)}
        <span className="text-[#234A96]">{cta?.title.slice(13)}</span>
      </h1>
      <p className="mt-4 font-light text-gray md:text-xl">{cta?.sub_title}</p>

      <Link href={`/${cta?.btn_link}`}>
        <Button className="mt-4">Start Learning</Button>
      </Link>
    </div>
  );
}
