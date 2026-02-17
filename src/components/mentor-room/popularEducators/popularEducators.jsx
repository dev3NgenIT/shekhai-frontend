"use client";

import { useState, useEffect } from "react";
import EducatorCard from "./educatorCard";
import axios from "axios";

export default function PopularInstructor() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "https://shekhai-server.onrender.com/api/v1/users/instructors/public"
        );


        if (response.data && response.data.success) {
          setInstructors(response.data.instructors || []);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching instructors:", err);
        setError("Failed to load instructors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) {
    return (
      <section className="container-width mt-16 md:mt-[6.25rem]">
        <header className="mb-8 text-center md:mb-16">
          <h1 className="text-4xl leading-normal text-title-one md:text-[40px]">
            Popular Educators
          </h1>
          <p className="text-lg text-[#898787] md:text-section-heading">
            Dedicated to Excellence in Teaching and Learning
          </p>
        </header>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-width mt-16 md:mt-[6.25rem]">
        <header className="mb-8 text-center md:mb-16">
          <h1 className="text-4xl leading-normal text-title-one md:text-[40px]">
            Popular Educators
          </h1>
          <p className="text-lg text-[#898787] md:text-section-heading">
            Dedicated to Excellence in Teaching and Learning
          </p>
        </header>
        <div className="text-center text-red-500 py-12">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="container-width mt-16 md:mt-[6.25rem]">
      <header className="mb-8 text-center md:mb-16">
        <h1 className="text-4xl leading-normal text-title-one md:text-[40px]">
          Popular Educators
        </h1>
        <p className="text-lg text-[#898787] md:text-section-heading">
          Dedicated to Excellence in Teaching and Learning
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 px-3 md:grid-cols-4 md:px-0">
        {instructors.length > 0 ? (
          instructors.slice(0, 8).map((instructor) => (
            <EducatorCard key={instructor._id} instructor={instructor} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No instructors found
          </div>
        )}
      </div>
    </section>
  );
}