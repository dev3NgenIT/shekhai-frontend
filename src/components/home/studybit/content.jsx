export default function Content({data}) {
  return (
    <div className="md:w-[36rem]">
      <h1 className="font-hanken_grotesk text-xl font-semibold text-title-two md:text-5xl md:leading-14">
        {data.title}
      </h1>
      <p className="mt-[1.125rem] text-xs text-text-dark md:text-body">
        {data.description}
      </p>
    </div>
  );
}
