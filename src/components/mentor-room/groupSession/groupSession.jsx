import Image from "next/image";
import Content from "./content";

export default function GroupSession({ mentorData }) {
  const sectionThree = mentorData?.section_three;
  return (
    <section className="container-width mt-16 flex flex-col items-center justify-between gap-x-[3.75rem] md:mt-[6.25rem] md:flex-row">
      <Image
        src={sectionThree?.left_img || "/group-call.png"}
        alt="group session"
        height={481}
        width={791}
      />

      <Content sectionThree={sectionThree} />
    </section>
  );
}
