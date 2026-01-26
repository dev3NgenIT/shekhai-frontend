import Header from "./header";
import TestimonialsCarousel from "./testimonialsCarousel";

export default function Testimonials({data}) {
  return (
    <section className="mt-16 bg-title-light px-[calc((100dvw-1200px)/2))] py-16 md:mt-[8.625rem] md:pt-[97px] md:pb-[2.625rem]">
      <Header data={data}/>
      <TestimonialsCarousel data={data.testimonials}/>
    </section>
  );
}
