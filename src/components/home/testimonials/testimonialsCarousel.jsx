"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import TestimonialCard from "./testimonialCard";

export default function TestimonialsCarousel({data}) {
  const [api, setApi] = useState(null);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleSelectSlide = (index) => {
    api?.scrollTo(index);
  };

  return (
    <section className="mt-10 px-3 md:mt-[93px]">
      <Carousel setApi={setApi} plugins={[Autoplay({ delay: 3000 })]}>
        <CarouselContent className="py-0.5">
          {data.map((items, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/3">
              <TestimonialCard items={items} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mx-auto mt-5 md:mt-11 w-fit space-x-1.5">
        {Array.from({ length: count }).map((_, index) => (
          <span
            key={index}
            className={`inline-block size-2 cursor-pointer rounded-full ${
              index + 1 === current ? "bg-base" : "bg-[#C9C9C9]"
            }`}
            onClick={() => handleSelectSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
