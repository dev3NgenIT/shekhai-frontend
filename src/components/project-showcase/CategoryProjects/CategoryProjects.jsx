import CategoryScrollArea from "./CategoryScrollArea";
import ProjectCarousel from "./ProjectCarousel";

export default function CategoryProjects() {
  return (
    <section className="container-width mx-auto mt-16 flex flex-col items-start justify-between md:mt-[6.25rem] md:flex-row">
      <CategoryScrollArea />

      <ProjectCarousel />
    </section>
  );
}
