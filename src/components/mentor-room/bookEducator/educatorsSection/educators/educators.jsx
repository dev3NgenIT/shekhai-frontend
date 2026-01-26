import Educator from "./educator";

export default function Educators() {
  return (
    <section className="col-span-8 hidden flex-wrap gap-6 md:flex">
      {Array.from({ length: 8 }).map((_, index) => (
        <Educator key={index} />
      ))}
    </section>
  );
}
