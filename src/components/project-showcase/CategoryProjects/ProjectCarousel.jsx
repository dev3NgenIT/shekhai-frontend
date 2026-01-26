import Stars from "@/components/shared/stars/stars";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCarousel() {
  return (
    <Carousel className="mt-16 w-full max-w-[588px] md:mt-0">
      <CarouselContent className={"px-4"}>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card className={"rounded-md p-[1.125rem] md:h-[45rem]"}>
                <CardContent className="p-0">
                  <Image
                    src="/farm.png"
                    alt="Project Placeholder"
                    width={552}
                    height={300}
                    className="rounded object-cover md:w-[552px]"
                  />

                  <h2 className="mt-7 mb-5 line-clamp-2 text-section-heading text-black">
                    Master the Fundamentals of UI/UX Design
                  </h2>
                  <Separator />

                  <p className="mt-5 mb-4 line-clamp-7 text-sm text-[#898787]">
                    Dive into the core principles of UI/UX design and learn how
                    to create intuitive, user-friendly interfaces. This course
                    is perfect for aspiring designers, developers, or anyone
                    passionate about product design. From wireframes to
                    interactive prototypes, you'll gain hands-on skills with
                    industry tools and best practices.
                  </p>

                  <div className="flex items-center justify-between rounded-md text-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base">BDT 3550</span>
                      <span className="text-lg text-[#A8A8A8] line-through">
                        BDT 6000
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-sm font-normal text-foreground">
                        4.9
                      </span>
                      {/* <div className="flex items-center gap-0.5">{renderStars(4.9)}</div> */}
                      <Stars count={2} />
                    </div>
                  </div>

                  <Link href={"/courses/smart-home-automation"}>
                    <Button className={"mt-2 w-full rounded"}>
                      Start Learning
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={"left-1 size-10 md:-left-12"} />
      <CarouselNext className={"right-1 size-10 md:-right-12"} />
    </Carousel>
  );
}
