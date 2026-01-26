import Image from "next/image";

export default function TeamCard({
  number,
  title,
  description,
  imageUrl,
  className = "",
}) {
  return (
    <div className={`mt-[6.25rem] ${className}`}>
      {/* Image Section */}
      <div className="relative flex h-64 items-center justify-center rounded-t-md bg-[#ECF4FA]">
        <Image
          src={"/mentor-1.png"}
          alt={`Team member ${number}`}
          width={283}
          height={387}
          className="absolute bottom-0 h-[387px] w-[283px] object-cover object-center"
        />
      </div>

      {/* Number Badge */}
      <div className="bg-stroke px-6 py-3">
        <span className="text-lg font-medium text-black">{number}</span>
      </div>

      {/* Content Section */}
      <div className="rounded-b-md bg-title-light p-6">
        <h3 className="mb-4 text-2xl font-semibold text-black">{title}</h3>
        <p className="text-[16px] leading-relaxed text-[#898787]">
          {description}
        </p>
      </div>
    </div>
  );
}
