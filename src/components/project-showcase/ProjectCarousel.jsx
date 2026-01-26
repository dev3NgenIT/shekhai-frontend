import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCarousel() {
  return (
    <Carousel
      className="mx-auto mt-16 w-[300px] md:mt-[6.25rem] md:h-[256px] md:w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/2">
            <div className="p-1">
              <Card className="h-[130px] p-0 shadow-none md:h-[256px]">
                <CardContent className="flex items-center justify-center gap-x-4 md:p-3.5">
                  <Image
                    src="/project-showcase.png"
                    alt="banner"
                    width={226}
                    height={228}
                    className="h-[114px] w-[114px] rounded-lg object-cover object-center md:h-[228px] md:w-[226px]"
                  />

                  <div className="flex h-full flex-col items-start justify-between md:py-8">
                    <h3 className="mt-5 md:mt-0 md:text-xl">
                      Robotics Software Project
                    </h3>
                    <p className="hidden text-gray md:block">
                      Build and program your own robots with hands-on kits
                      designed for students and hobbyists alike.
                    </p>

                    <Link href="/courses/robotics">
                      <Button className={"text-sm"}>Start Learning</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={"-left-8 md:-left-10"} />
      <CarouselNext className={"-right-8 md:-right-10"} />
    </Carousel>
  );
}
