export default function Content({ data }) {
  return (
    <section className="mx-auto w-[300px] text-center md:w-[815px]">
      <h1 className="font-hanken_grotesk text-lg leading-none font-semibold text-title-one md:text-hero-headline">
        {data.title}
      </h1>
      <hr className="mx-auto mt-7 mb-6 h-[3px] w-[12.875rem] bg-stroke" />
      <p className="text-sm text-gray md:text-lg">
        {data.description}
      </p>
    </section>
  );
}
