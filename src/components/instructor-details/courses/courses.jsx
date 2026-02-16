import Image from "next/image";
import SideCardImg from "../../../assets/side-card-img.png";
import CoursesCarousel from "./coursesCarousel/coursesCarousel";
import Header from "./header";

export default function Courses({instructor}) {
  return (
    <section className="container-width mt-16 md:mt-[6.25rem] md:px-0">
      <Header instructor={instructor} />

      <section className="mt-5 flex flex-wrap items-center justify-center gap-x-5 md:mt-10 md:flex-nowrap">
        <CoursesCarousel instructor={instructor}/>

        <Image
          src={SideCardImg}
          alt="side card image"
          width={294}
          height={425}
          className="hidden h-[425px] w-[294px] rounded-2xl border border-[#D9D9D9] md:block"
        />
      </section>
    </section>
  );
}
