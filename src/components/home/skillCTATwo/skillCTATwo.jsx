import Image from "next/image";
import Content from "./content";

export default function SkillCTATwo({ data }) {
  return (
    <section className="mt-16 flex items-center justify-center bg-[#ECF4FA] md:mt-[6.25rem] md:justify-between">
      <Content data={data} />

      <Image
        src={data.image}
        alt="skill image"
        width={720}
        height={340}
        className="hidden md:block"
      />
    </section>
  );
}
