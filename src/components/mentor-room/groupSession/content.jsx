import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Content({ sectionThree }) {
  return (
    <div className="mt-4 px-5 md:px-0">
      <h2 className="font-hanken_grotesk text-[39px] leading-[1.25] font-semibold text-black">
        {sectionThree?.title}
      </h2>
      <p className="small-description mt-3 text-[#898787]">
        {sectionThree?.description_title}
      </p>

      <Link href={`/${sectionThree?.btn_link}`}>
        <Button className="mt-8">Book Now</Button>
      </Link>
    </div>
  );
}
