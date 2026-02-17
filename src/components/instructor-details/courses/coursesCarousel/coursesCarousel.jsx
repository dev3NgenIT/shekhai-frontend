"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "./courseCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CoursesCarousel({ instructor }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const instructorId = instructor?._id;


  useEffect(() => {
    const fetchCourses = async () => {
      if (!instructorId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          "https://shekhai-server.onrender.com/api/v1/courses"
        );

        if (response.data.success && response.data.courses) {
          // Filter courses by instructor ID
          const filteredCourses = response.data.courses.filter(
            (course) => course.instructor?._id === instructorId
          );

          // Remove duplicates based on course _id
          const uniqueCourses = filteredCourses.filter(
            (course, index, self) =>
              index === self.findIndex((c) => c._id === course._id)
          );

          console.log(`Found ${uniqueCourses.length} courses for instructor:`, uniqueCourses);
          setCourses(uniqueCourses);
          setError(null);
        } else {
          setError("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error.response?.data?.message || error.message || "Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [instructorId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-gray-600">No courses found for this instructor</p>
      </div>
    );
  }

  return (
    <Carousel className="w-[292px] md:w-[76%]">
      <CarouselContent className="-ml-2">
        {courses.map((course) => (
          <CarouselItem key={course._id} className="basis-full pl-2 md:basis-1/3">
            <CourseCard course={course} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-10 md:hidden" />
      <CarouselNext className="-right-10 md:hidden" />
    </Carousel>
  );
}