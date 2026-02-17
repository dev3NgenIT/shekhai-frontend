"use client";

import { useState, useEffect } from "react";
import {
  Carousel as CarouselContainer,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselCard from "./carouselCard";
import axios from "axios";

export default function Carousel({ features }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get("https://shekhai-server.onrender.com/api/v1/courses");

        if (response.data.success && response.data.courses) {
          // Get random 5 courses
          const allCourses = response.data.courses;
          const shuffled = [...allCourses].sort(() => 0.5 - Math.random());
          const randomCourses = shuffled.slice(0, 5);
          setCourses(randomCourses);
        }
        setError(null);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="mt-10 ml-[2.10rem] w-[290px] md:w-[37rem] text-center">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="mt-10 ml-[2.10rem] w-[290px] md:w-[37rem] text-center text-red-500">
        {error}
      </div>
    );
  }

  // Show empty state
  if (!courses || courses.length === 0) {
    return (
      <div className="mt-10 ml-[2.10rem] w-[290px] md:w-[37rem] text-center text-gray-500">
        No courses available
      </div>
    );
  }

  return (
    <CarouselContainer
      opts={{
        align: "start",
        slidesToScroll: 1,
        loop: true,
      }}
      className="mt-10 ml-[2.10rem] w-[290px] md:w-[37rem]"
    >
      <CarouselContent className="-ml-[9px]">
        {courses.map((course, index) => (
          <CarouselItem
            key={course._id || index}
            className="basis-full pl-[9px] md:basis-1/2"
          >
            <CarouselCard course={course} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselContainer>
  );
}