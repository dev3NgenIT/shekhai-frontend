import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Bell, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function BannerCarousel() {
  return (
    <Carousel>
      <CarouselContent className={"mt-2 w-[400px] md:w-full"}>
        {[
          { id: 1, title: "LaravelCourses", progress: 70, watched: "2/8" },
          { id: 2, title: "VueJs Courses", progress: 30, watched: "3/8" },
          { id: 1, title: "LaravelCourses", progress: 70, watched: "2/8" },
          { id: 3, title: "CSS3 Courses", progress: 85, watched: "7/8" },
          { id: 2, title: "VueJs Courses", progress: 30, watched: "3/8" },
        ].map((course) => (
          <CarouselItem key={course.id} className="basis-full md:basis-1/3">
            <Card
              key={course.id}
              className="cursor-pointer justify-center p-0 pt-3 transition-shadow hover:shadow-md md:w-full"
            >
              <CardContent className="p-4">
                <Link
                  href={"/courses/full-stack-developer"}
                  className="mb-3 flex items-center gap-3"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 p-2">
                    <Bell className="text-base" />
                  </div>

                  <div className="flex-1">
                    <div className="text-sm text-gray-500">
                      {course.watched} Watched
                    </div>
                    <div className="font-medium">{course.title}</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={"-left-4"} />
      <CarouselNext className={"-right-4"} />
    </Carousel>
  );
}
