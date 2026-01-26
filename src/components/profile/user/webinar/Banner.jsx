import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LiveSessionCard from "./LiveSessionCard";

export default function Banner() {
  return (
    <Carousel className={"mx-auto w-full max-w-[354px] md:max-w-[1200px]"}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-full">
            <LiveSessionCard />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={"-left-2 md:-left-12"} />
      <CarouselNext className={"-right-2 md:-right-12"} />
    </Carousel>
  );
}
