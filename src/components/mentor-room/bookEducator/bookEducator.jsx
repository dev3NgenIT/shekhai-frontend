import EducatorsSection from "./educatorsSection/educatorsSection";

export default function BookEducator() {
  return (
    <section className="container-width mt-16 px-3 md:mt-[6.25rem] md:px-0">
      <header className="mb-8 text-center md:mb-16">
        <h1 className="text-3xl leading-normal text-title-one md:text-[40px]">
          Book Your Educator
        </h1>
        <p className="mx-auto mt-2 w-[76%] text-[#898787] md:mt-0 md:w-full md:text-section-heading">
          Plan Your Appointment with a Professional Educator
        </p>
      </header>

      <EducatorsSection />
    </section>
  );
}
