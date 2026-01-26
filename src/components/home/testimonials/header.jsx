export default function Header({ data }) {
  return (
    <div className="mx-auto text-center md:w-[617px]">
      <h1 className="relative text-2xl text-title-one after:absolute after:-bottom-[20px] after:left-1/2 after:h-0.5 after:w-[12.875rem] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-stroke after:content-[''] md:text-hero-headline md:after:-bottom-[32px]">
        {data.title}
      </h1>

      <p className="mt-8 text-gray md:mt-[45px] md:text-card-title">
        {data.subtitle}
      </p>
    </div>
  );
}
