import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Content({data}) {
  return (
    <div className="text-center">
      <h1 className="font-hanken_grotesk text-lg leading-none font-semibold text-title-one md:text-hero-headline">
        {data.title}
      </h1>
      <h4 className="mt-2 text-sm text-gray md:text-xl">
        {data.tagline}
      </h4>
      <h4 className="mt-2 hidden text-xs text-text-dark md:block md:text-2xl">
        {data.special_offer}
      </h4>
      <Button variant="outline" className="mt-4 bg-transparent text-xs">
        <Link href={`${data.button_link}`}>{data.button_text}</Link>
      </Button>
      <p className="pt-5">{data.description}</p>
    </div>
  );
}
