import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "./courseCard";

export default function CoursesCarousel() {
  return (
    <Carousel className="w-[292px] md:w-[76%]">
      <CarouselContent className="-ml-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-full pl-2 md:basis-1/3">
            <CourseCard />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-10 md:hidden" />
      <CarouselNext className="-right-10 md:hidden" />
    </Carousel>
  );
}
