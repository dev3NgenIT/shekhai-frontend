"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Cart from "@/components/courses/course/Cart";
import CourseDetails from "@/components/courses/course/CourseDetails";
import MentorProfile from "@/components/courses/course/MentorProfile";

export default function Page() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const courseId = params?.slug;

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      try {
        const response = await axios.get(
          `https://shekhai-server.onrender.com/api/v1/courses/${courseId}`,
        );

        if (response.data.success) {
          setCourse(response.data.course || response.data.data);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
            </div>
            <div className="space-y-6">
              <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
              <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <CourseDetails />
          
          {/* Right Column - Mentor and Cart */}
          <div className="space-y-6">
            {/* Mentor Profile with course data */}
            <MentorProfile course={course} />
            {/* Shopping Cart with course data */}
            <Cart course={course} />
          </div>
        </div>
      </div>
    </div>
  );
}