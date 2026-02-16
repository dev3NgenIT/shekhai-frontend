import WebinarsCarousel from "./webinarsCarousel";

export default function Webinars({instructor}) {
  return (
    <section className="container-width mt-16 px-4 md:mt-[6.25rem] md:px-0">
      <h2 className="text-2xl font-medium md:text-3xl">
        Upcoming webinar with {instructor?.name || "Wade Warren"}
      </h2>

      <WebinarsCarousel instructor={instructor} />
    </section>
  );
}
