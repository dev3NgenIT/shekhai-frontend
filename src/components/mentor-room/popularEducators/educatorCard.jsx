import Image from "next/image";
import Link from "next/link";

export default function EducatorCard() {
  return (
    <Link
      href={"/instructors/ralph-edwards"}
      className="relative h-[189px] w-full overflow-hidden md:w-[282px]"
    >
      <Image
        src="/educator.png"
        alt="educator image"
        width={282}
        height={189}
        className="h-[200px] w-full object-cover md:h-[189px] md:w-[282px]"
      />

      <div className="absolute right-0 bottom-0 left-0 flex flex-col items-center justify-center bg-[#181818] px-4 py-2 font-bold text-white">
        <h3 className="text-lg leading-normal">Ralph Edwards</h3>
        <p className="text-[14px]">Product Management Leadership</p>
      </div>
    </Link>
  );
}
