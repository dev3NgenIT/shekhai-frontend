import Webinars from "./webinars";

export default function WebinarSection() {
  return (
    <section className="container-width mt-16 text-center md:mt-[6.25rem]">
      <h2 className="text-3xl font-medium md:text-[2.5rem]">
        Upcoming Webinars
      </h2>
      <p className="mx-auto mt-2.5 w-[70%] text-[#898787] md:w-full md:text-section-heading">
        Join Live Sessions Led by Industry Experts
      </p>

      <Webinars />
    </section>
  );
}
