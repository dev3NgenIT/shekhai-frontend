"use client";
import { useState, useEffect } from "react";
import Content from "./content";
import MentorCarousel from "./mentorCarousel";
import axios from "axios";

export default function MentorSliderTwo() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/instructors/public"
        );

        // Assuming the response has a data property with the instructors
        // Adjust this based on your actual API response structure
        if (response.data.success) {
          setInstructors(response.data.data || response.data.instructors || []);
        } else {
          setInstructors(response.data || []);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching instructors:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch instructors");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <section className="container-width mt-16 md:mt-[6.25rem]">
        <div className="text-center py-8">Loading mentors...</div>
      </section>
    );
  }

  // Handle error state
  if (error) {
    return (
      <section className="container-width mt-16 md:mt-[6.25rem]">
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      </section>
    );
  }

  // Create data object with instructors
  const data = {
    instructors: instructors,
    // You can add any additional data needed by your components here
    title: "Our Expert Mentors",
    description: "Learn from industry professionals"
  };
const instructor = data.instructors[0] || null;
  return (
    <section className="container-width mt-16 md:mt-[6.25rem]">
      <Content data={data} />
      <MentorCarousel data={data} />
    </section>
  );
}