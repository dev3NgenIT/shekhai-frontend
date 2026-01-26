import Stat from "./stat";


export default function Stats({data}) {

  return (
    <section className="mt-36 grid grid-cols-2 gap-4 md:divide-x-2 divide-dashed bg-title-one px-[calc((100dvw-1200px)/2))] py-10 md:h-[11.25rem] md:grid-cols-4">
      {data.stats.map((stat,index) => (
        <Stat key={index} stat={stat} />
      ))}
    </section>
  );
}
