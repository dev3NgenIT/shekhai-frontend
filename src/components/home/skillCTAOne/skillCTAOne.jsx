import Image from "next/image";
import Content from "./content";

export default function SkillCTAOne({data}) {
  return (
    <section className="mt-16 flex items-center justify-center bg-[#ECF4FA] py-5 md:mt-[6.25rem] md:justify-between md:py-0">
      <Image
        src="/farm.png"
        alt="skill image"
        width={480}
        height={340}
        className="hidden md:block md:h-[340px] md:w-[480px]"
      />

      <Content data={data}/>

      <Image
        src="/farm.png"
        alt="skill image"
        width={480}
        height={340}
        className="hidden h-[56.5px] w-[100px] md:block md:h-[340px] md:w-[480px]"
      />
    </section>
  );
}
