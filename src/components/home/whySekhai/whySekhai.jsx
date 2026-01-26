import Perks from "./perks";

export default function WhySekhai({ data }) {
  return (
    <section className="container-width mt-[8rem] md:mt-[10rem]">
      <h1 className="relative text-center text-2xl font-semibold text-black before:absolute before:top-1/2 before:left-1/2 before:-z-1 before:-translate-x-1/2 before:-translate-y-1/2 before:text-[15rem] before:text-[#70A0BE] before:opacity-15 before:content-['?'] md:text-hero-headline md:before:text-[20rem]">
        {data.title.slice(0, -5)} <br />
        <span className="text-[#234A96]">{data.title.slice(-4)}</span>
      </h1>

      <Perks data={data.features} />
    </section>
  );
}
