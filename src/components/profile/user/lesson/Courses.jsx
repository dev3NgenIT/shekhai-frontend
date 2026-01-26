import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Courses() {
  return (
    <section>
      <h3 className="mt-10 text-xl font-medium">Your Courses:</h3>

      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            id: 1,
            title: "Urban Farming",
            instructor: "Jacob Jones",
            type: "LaravelCourses",
            image:
              "https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg?auto=compress&cs=tinysrgb&w=400",
            completed: false,
            progress: 70,
          },
          {
            id: 2,
            title: "Fitness And Personal Training",
            instructor: "Savannah Nguyen",
            type: "Angular Courses",
            image:
              "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=400",
            completed: false,
            progress: 30,
          },
          {
            id: 3,
            title: "Cooking & Baking",
            instructor: "Justin Edwards",
            type: "Objective C Courses",
            image:
              "https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg?auto=compress&cs=tinysrgb&w=400",
            completed: false,
            progress: 85,
          },
          {
            id: 4,
            title: "Urban Farming",
            instructor: "Jacob Jones",
            type: "LaravelCourses",
            image:
              "https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg?auto=compress&cs=tinysrgb&w=400",
            completed: false,
            progress: 70,
          },
          {
            id: 5,
            title: "Fitness And Personal Training",
            instructor: "Savannah Nguyen",
            type: "Angular Courses",
            image:
              "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=400",
            completed: false,
            progress: 77,
          },
          {
            id: 6,
            title: "Cooking & Baking",
            instructor: "Justin Edwards",
            type: "Objective C Courses",
            image:
              "https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg?auto=compress&cs=tinysrgb&w=400",
            completed: false,
            progress: 85,
          },
        ].map((course) => (
          <Card
            key={course.id}
            className="cursor-pointer p-4 transition-shadow hover:shadow-md"
          >
            <CardContent className="p-0">
              <Link href={`/courses/${course.type}`} className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-40 w-full rounded-lg object-cover"
                />
                {course.completed && (
                  <div className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full bg-green-500 p-1.5">
                    <Heart className="text-white" />
                  </div>
                )}
              </Link>
              <Badge
                className={
                  "mt-2 rounded-full border-0 bg-base/50 px-6 !text-sm font-normal text-base hover:bg-base/50"
                }
              >
                Frontend
              </Badge>
              <div className="mt-4 flex flex-col gap-4">
                <Link
                  href={`/courses/${course.type}`}
                  className="text-xl font-medium"
                >
                  {course.title}
                </Link>
                <Progress
                  className={"bg-base/30"}
                  value={course.progress || 0}
                />
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {course.instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-gray-600">
                    <div>{course.instructor}</div>
                    <div className="text-xs text-blue-600">{course.type}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
