import { BsShieldFillCheck } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
import Quality from "./quality";

const qualities = [
  {
    icon: PiCertificateFill,
    title: "3+ Years of Experience",
  },
  {
    icon: BsShieldFillCheck,
    title: "Certified Instructor",
  },
  {
    icon: PiCertificateFill,
    title: "3+ Years of Experience",
  },
  {
    icon: FaLaptopCode,
    title: "5 Courses Available",
  },
];

export default function Qualities() {
  return (
    <section className="full-bleed-padding grid w-full grid-cols-2 gap-y-5 bg-[#ECF4FA] p-5 md:h-[14.875rem] md:grid-cols-4 md:place-items-center md:gap-0 md:p-0">
      {qualities.map((quality, index) => (
        <Quality key={index}> {/* Added key prop here */}
          <quality.icon className="size-12 text-[#234A96] md:size-16" />
          <span className="mt-2 text-sm md:mt-4 md:text-xl">
            {quality.title}
          </span>
        </Quality>
      ))}
    </section>
  );
}