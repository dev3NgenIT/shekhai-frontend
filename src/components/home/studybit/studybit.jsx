import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import Content from "./content";

export default function Studybit({data}) {
  return (
    <section
      className={`container-width mt-16 flex h-[16rem] items-center justify-between overflow-hidden rounded border-2 border-[#3AAEF6] bg-[#DDF1FF] [background-image:_url("/round-mesh.png")] px-3 md:mt-[6.25rem] md:h-[17.5rem] md:pr-11 md:pl-[4.875rem]`}
    >
      <Content data={data}/>

      <div className="flex items-center justify-between">
        <Image
          src="/multiple-star.png"
          alt="stars icon"
          width={60}
          height={78}
          className="mb-16"
        />

        <Image src={data.image} alt="mentor image" width={234} height={327} />

        <Button
          variant="outline"
          className="mb-11 ml-[4.875rem] hidden size-10 self-end rounded-full bg-transparent p-0 md:flex"
        >
          <Link href={data.button_link}>
            <IoIosArrowForward className="size-6" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
