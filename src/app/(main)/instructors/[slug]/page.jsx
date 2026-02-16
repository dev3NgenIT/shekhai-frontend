"use client";
import Banner from "@/components/instructor-details/banner/banner";
import Courses from "@/components/instructor-details/courses/courses";
import Reviews from "@/components/instructor-details/reviews/reviews";
import Webinars from "@/components/instructor-details/webinars/webinars";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InstructorPage() {
  const params = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get the instructor ID/slug from params
  const instructorSlug = params?.slug;
  
  console.log("Params object:", params);
  console.log("Instructor slug:", instructorSlug);

  useEffect(() => {
    const fetchInstructor = async () => {
      if (!instructorSlug) {
        setError("No instructor ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `http://localhost:8080/api/v1/users/instructors/public/${instructorSlug}`,
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          // Check the correct response structure from your API
          setInstructor(response.data.user || response.data.data || response.data.instructor);
        } else {
          setError(response.data.message || "Failed to fetch instructor");
        }
      } catch (error) {
        console.error("Error fetching instructor:", error);
        setError(error.response?.data?.message || error.message || "Error fetching instructor");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();  
  }, [instructorSlug]); // Dependency on instructorSlug (not params.id)

  console.log("Instructor data:", instructor);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading instructor...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-4 font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Not found state
  if (!instructor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">Instructor not found</p>
          <button 
            onClick={() => window.history.back()} 
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <section>
      <Banner instructorId={instructorSlug} instructor={instructor} />
      <Courses instructorId={instructorSlug} instructor={instructor}/>
      <Webinars instructorId={instructorSlug}instructor={instructor}/>
      <Reviews instructorId={instructorSlug} instructor={instructor}/>
    </section>
  );
}