import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselCard from "./carouselCard";

export default function MentorCarousel({ data }) {
  // Handle both formats: direct array or object with experts property
  let experts = [];
  
  if (Array.isArray(data)) {
    experts = data;
  } else if (data?.experts && Array.isArray(data.experts)) {
    experts = data.experts;
  }

  // Check if experts array is empty
  if (!experts || experts.length === 0) {
    return (
      <div className="mt-[3.75rem] flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No mentors to display</p>
      </div>
    );
  }

  return (
    <Carousel className="mt-[3.75rem]" opts={{ align: "start" }}>
      <CarouselContent className="ml-8 md:-ml-4">
        {experts.map((item, index) => (
          <CarouselItem 
            key={item._id || item.id || index} 
            className="basis-full pl-4 md:basis-1/4"
          >
            <CarouselCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={"left-1"} />
      <CarouselNext className={"right-1"} />
    </Carousel>
  );
}