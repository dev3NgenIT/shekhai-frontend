import Content from "./content";
import MentorCarousel from "./mentorCarousel";

export default function MentorSliderTwo({data}) {
  return (
    <section className="container-width mt-16 md:mt-[6.25rem]">
      <Content data={data}/>

      <MentorCarousel data={data}/>
    </section>
  );
}
