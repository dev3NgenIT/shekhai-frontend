"use client";

import Stars from "@/components/shared/stars/stars";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import SideCardImg from "../../../../assets/side-card-img.png";

export default function CourseCard({ course }) {
  // If course is not provided, don't render
  if (!course) return null;

  return (
    <Card className="h-[425px] w-[294px] justify-between gap-0 p-2 shadow-none">
      <CardHeader className="block h-fit p-0">
        <Image
          src={course.bannerImage?.data || SideCardImg}
          alt={course.title}
          width={278}
          height={200}
          className="h-[200px] w-[278px] rounded-[0.625rem] object-cover"
        />
      </CardHeader>

      <CardContent className="mt-5 p-0">
        <p className="line-clamp-2 text-body text-black font-semibold">
          {course.title}
        </p>

        {course.shortDescription && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            {course.shortDescription}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-x-1.5">
            <Image
              src={course.instructor?.avatarUrl || "/educator.png"}
              width={30}
              height={30}
              alt={course.instructor?.name || "instructor"}
              className="size-[1.875rem] rounded-full object-cover"
            />
            <span className="text-sm text-[#938F8F]">
              {course.instructor?.name || "Instructor"}
            </span>
          </div>

          <div className="flex items-center gap-x-1">
            <span className="text-sm font-medium">
              {/* {course.rating?.toFixed(1) || "0.0"} */}
            </span>
            {course.level && (
              <div className="mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {course.level}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-0 mt-4">
        <Link href={`/checkout?course=${course._id}`} className="w-full">
          <Button className="w-full justify-between bg-blue-600 hover:bg-blue-700">
            <span>BDT {course.price?.toFixed(2) || "0.00"}</span>
            <span>Enroll Now</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}