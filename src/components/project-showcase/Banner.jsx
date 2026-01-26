import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Banner() {
  return (
    <Carousel className="h-[114px] w-full md:h-[400px]">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Image
              src="/project-showcase.png"
              alt="banner"
              width={1200}
              height={400}
              className="h-[114px] w-[343px] object-cover md:h-[400px] md:w-[1200px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
