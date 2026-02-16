import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Content({data}) {
  return (
    <div className="w-[437px] p-4 md:ml-[22rem]">
      <h1 className="font-hanken_grotesk text-2xl md:text-[41px] md:leading-12">
      {data.title} <br />{" "}
        <span className="text-[#234A96]">{data.subtitle}</span>
      </h1>
      <p className="mt-1.5 font-light text-gray md:mt-4 md:text-xl">
        {data.description}
      </p>

      <Button className="mt-4">
        <Link href={"/courses"}>{data.button_text}</Link>
      </Button>
    </div>
  );
}
