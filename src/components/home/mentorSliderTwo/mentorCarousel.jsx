"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselCard from "./carouselCard";
import { useEffect, useState, useCallback } from "react";

export default function MentorCarousel({ data }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Handle different data formats
  let experts = [];

  if (Array.isArray(data)) {
    // If data is directly an array
    experts = data;
  } else if (data?.instructors && Array.isArray(data.instructors)) {
    // If data has instructors property (your current structure)
    experts = data.instructors;
  } else if (data?.experts && Array.isArray(data.experts)) {
    // If data has experts property (fallback)
    experts = data.experts;
  }


  // Set up autoplay when carousel is ready
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

  // Autoplay functionality
  useEffect(() => {
    if (!api || experts.length === 0) return;

    const autoplayInterval = setInterval(() => {
      if (current === count) {
        // If at last slide, go to first
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoplayInterval);
  }, [api, current, count, experts.length]);

  // Check if experts array is empty
  if (!experts || experts.length === 0) {
    return (
      <div className="mt-[3.75rem] flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No mentors to display</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true, // Enable looping for smoother autoplay
        }}
        className="mt-[3.75rem]"
      >
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

        {/* Optional navigation buttons */}
        <CarouselPrevious className="-left-10 hidden md:flex" />
        <CarouselNext className="-right-10 hidden md:flex" />
      </Carousel>
    </div>
  );
}