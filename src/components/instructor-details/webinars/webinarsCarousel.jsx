import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import WebinarCard from "./webinarCard";

export default function WebinarsCarousel() {
  return (
    <Carousel className="mt-6 md:mt-14">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/3">
            <WebinarCard />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
