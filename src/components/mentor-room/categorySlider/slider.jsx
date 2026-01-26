import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SliderCard from "./sliderCard";

export default function Slider({SectionTwoDataIcons}) {
  // SectionTwoDataIcons should be the array of icons
  const icons = SectionTwoDataIcons || [];
  
  return (
    <Carousel
      className="mx-auto mt-[69px] w-[76%] md:w-full"
      opts={{ align: "start" }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {icons.map((icon, index) => (
          <CarouselItem
            className="basis-full pl-2 md:basis-1/4 md:pl-4"
            key={icon._id || index}
          >
            {/* Pass individual icon object to SliderCard */}
            <SliderCard icon={icon} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselNext className={"-right-10 md:-right-12"} />
      <CarouselPrevious className={"-left-10 md:-left-12"} />
    </Carousel>
  );
}