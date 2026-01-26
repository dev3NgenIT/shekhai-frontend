import Image from "next/image";

export default function Educator() {
  return (
    <div className="relative flex h-[11.75rem] w-96 items-center justify-between overflow-hidden rounded-lg bg-text-light">
      <div className="px-5">
        <h3 className="text-lg text-title-one">Wade Warren</h3>
        <p className="text-gray">Ethical Hacker</p>
      </div>

      <Image
        src="/instructor-carousel-image.png"
        alt="instructor image"
        width={384}
        height={188}
        className="absolute top-0 right-0"
      />
    </div>
  );
}
