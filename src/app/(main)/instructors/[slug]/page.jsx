"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Webinars from "@/components/instructor-details/webinars/webinars";
import Courses from "@/components/instructor-details/courses/courses";
import Banner from "@/components/instructor-details/banner/banner";

export default function InstructorPage() {
  const router = useRouter();
  const params = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableInstructors, setAvailableInstructors] = useState([]);
  const [showAllInstructors, setShowAllInstructors] = useState(false);

  // Get the instructor ID/slug from params
  const instructorSlug = params?.slug;

  // Function to fetch all instructors
  const fetchAllInstructors = async () => {
    try {
      const response = await axios.get(
        'https://shekhai-server.onrender.com/api/v1/users/instructors/public',
        {
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success && response.data.instructors) {
        setAvailableInstructors(response.data.instructors);
        return response.data.instructors;
      }
      return [];
    } catch (error) {
      console.error("Error fetching all instructors:", error);
      return [];
    }
  };

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
          `https://shekhai-server.onrender.com/api/v1/users/instructors/public/${instructorSlug}`,
          {
            timeout: 10000,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );


        if (response.data.success) {
          setInstructor(response.data.instructor);
        } else {
          setError(response.data.message || "Failed to fetch instructor");
          // Fetch all instructors to show alternatives
          await fetchAllInstructors();
        }
      } catch (error) {
        console.error("Error fetching instructor:", error);

        if (error.response?.status === 404) {
          setError(`Instructor with ID "${instructorSlug}" was not found.`);
          // Fetch all instructors to show alternatives
          await fetchAllInstructors();
        } else if (error.response) {
          setError(error.response.data?.message || `Error ${error.response.status}: Failed to fetch instructor`);
        } else if (error.request) {
          setError("No response from server. Please check if the server is running.");
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [instructorSlug]);

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

  // Error state with available instructors
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center p-8 bg-red-50 rounded-lg max-w-4xl w-full">
          <p className="text-red-600 mb-6 font-semibold text-lg">{error}</p>

          {availableInstructors.length > 0 && (
            <div className="mb-6">
              <button
                onClick={() => setShowAllInstructors(!showAllInstructors)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mb-4"
              >
                {showAllInstructors ? 'Hide' : 'Show'} Available Instructors ({availableInstructors.length})
              </button>

              {showAllInstructors && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-4 text-lg">Available Instructors:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableInstructors.map((inst) => (
                      <div
                        key={inst._id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <p className="font-semibold text-gray-800">{inst.name || 'Unnamed Instructor'}</p>
                        <p className="text-sm text-gray-600 mb-2">ID: {inst._id}</p>
                        <p className="text-sm text-gray-600 mb-3">Email: {inst.email || 'No email'}</p>
                        <button
                          onClick={() => router.push(`/instructor/${inst._id}`)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors w-full"
                        >
                          View This Instructor
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>

            <button
              onClick={() => router.push('/instructors')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              View All Instructors
            </button>
          </div>
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
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Success state - instructor found
  return (
    <section>
      <Banner instructorId={instructorSlug} instructor={instructor} />
      <Courses instructorId={instructorSlug} instructor={instructor} />
      <Webinars instructorId={instructorSlug} instructor={instructor} />
      {/* <Reviews instructorId={instructorSlug} instructor={instructor}/> */}
    </section>
  );
}