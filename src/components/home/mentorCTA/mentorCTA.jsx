import Image from "next/image";
import LeftContent from "./leftContent";
import RightContent from "./rightContent";

export default function MentorCTA({ data }) {
  return (
    <section className="mt-16 flex md:h-[22.125rem] flex-col py-7 md:py-0 items-end justify-between bg-title-one px-[calc((100dvw-1200px)/2))] md:mt-[11.375rem] md:flex-row">
      <LeftContent data={data} />

      <Image
        src={data.background_image}
        alt="mentor image"
        width={337}
        height={437}
        className="hidden aspect-[337/437] md:block"
      />

      <RightContent data={data} />
    </section>
  );
}
