import EducatorCard from "./educatorCard";

export default function PopularInstructor() {
  return (
    <section className="container-width mt-16 md:mt-[6.25rem]">
      <header className="mb-8 text-center md:mb-16">
        <h1 className="text-4xl leading-normal text-title-one md:text-[40px]">
          Popular Educators
        </h1>
        <p className="text-lg text-[#898787] md:text-section-heading">
          Dedicated to Excellence in Teaching and Learning
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 px-3 md:grid-cols-4 md:px-0">
        {Array.from({ length: 8 }).map((_, index) => (
          <EducatorCard key={index} />
        ))}
      </div>
    </section>
  );
}
