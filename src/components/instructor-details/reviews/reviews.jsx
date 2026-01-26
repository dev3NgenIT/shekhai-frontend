import Image from "next/image";
import ReviewsBannerImg from "../../../assets/courses-banner.png";
import ReviewsCarousel from "./reviewsCarousel";

export default function Reviews() {
  return (
    <section className="container-width mt-16 px-4 md:mt-[6.25rem] md:px-0">
      <h2 className="text-2xl font-medium md:text-3xl">
        Why Learners Love These Courses
      </h2>

      <div className="mt-8 flex flex-col items-center justify-between gap-x-5 md:mt-14 md:flex-row">
        <Image
          src={ReviewsBannerImg}
          alt="reviews banner"
          width={590}
          height={491}
          className="h-[491px] w-[590px] rounded-3xl"
        />

        <ReviewsCarousel />
      </div>
    </section>
  );
}
