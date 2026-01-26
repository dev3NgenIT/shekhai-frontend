import Image from "next/image";
import Content from "./content";

export default function SkillCTA({mentorData}) {
   const cta = mentorData?.cta_section; 
  return (
    <section className="mt-[6.25rem] flex items-center justify-between bg-[#ECF4FA]">
      <Content mentorData={mentorData}/>

      <Image
        src={cta?.right_img || "/skill-cta.png"}
        alt="skill image"
        width={720}
        height={340}
        className="hidden md:block"
      />
    </section>
  );
}
