import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import WebinarCard from "./webinarCard";

export default function Webinars() {
  return (
    <Carousel className="mt-8 px-3 md:mt-[3.875rem]">
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/3">
            <WebinarCard />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
