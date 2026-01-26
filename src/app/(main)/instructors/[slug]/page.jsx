import Banner from "@/components/instructor-details/banner/banner";
import Courses from "@/components/instructor-details/courses/courses";
import Reviews from "@/components/instructor-details/reviews/reviews";
import Webinars from "@/components/instructor-details/webinars/webinars";

export default function InstructorPage() {
  return (
    <section>
      <Banner />
      <Courses />
      <Webinars />
      <Reviews />
    </section>
  );
}
