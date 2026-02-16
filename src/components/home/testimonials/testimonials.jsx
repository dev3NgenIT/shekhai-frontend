import Header from "./header";
import TestimonialsCarousel from "./testimonialsCarousel";

export default function Testimonials({data}) {
  return (
    <section className="mb-16 bg-title-light px-[calc((100dvw-1200px)/2))] py-16 ">
      <Header data={data}/>
      <TestimonialsCarousel data={data.testimonials}/>
    </section>
  );
}
