export default function Perk({ icon, title, description }) {
  return (
    <div className="flex md:h-[300px] md:w-[387px] flex-col items-center justify-start rounded-md border border-dashed border-stroke px-7 py-10 text-center">
      <div>
        {icon} <span></span>
      </div>

      <h3 className="relative mt-4 text-card-title text-[#181818] after:absolute after:-bottom-[15px] after:left-1/2 after:h-0.5 after:w-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-stroke after:content-['']">
        {title}
      </h3>
      <p className="mt-5 text-sm leading-normal font-normal text-gray">
        {description}
      </p>
    </div>
  );
}
