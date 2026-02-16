import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ReviewCard from "./reviewCard";

export default function ReviewsCarousel() {
  return (
    <Carousel
      orientation="vertical"
      className="mt-7 w-full self-stretch md:mt-0"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="h-[507px]">
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index} className="h-1/2 basis-1/2">
            <ReviewCard />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
