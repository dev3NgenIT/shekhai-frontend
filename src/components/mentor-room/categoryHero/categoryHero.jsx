import Image from "next/image";
import Content from "./content";

export default function CategoryHero({mentorData}) {

 
  return (
    <section className="container-width mt-16 flex flex-col items-center justify-between gap-x-[5.5rem] px-4 md:mt-[6.25rem] md:flex-row">
      <Image
        src="/stitching.png"
        alt="hero image"
        width={587}
        height={420}
        className="h-[245px] w-[343px] md:h-[420px] md:w-[587px]"
      />

      <Content mentorData={mentorData} />
    </section>
  );
}
