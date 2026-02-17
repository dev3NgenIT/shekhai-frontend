"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WebinarCard from "./webinarCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function WebinarsCarousel({ instructor }) {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get instructor name for filtering (since no ID in webinar data)
  const instructorName = instructor?.name;

  useEffect(() => {
    const fetchWebinars = async () => {
      if (!instructorName) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch published webinars
        const response = await axios.get(
          "https://shekhai-server.onrender.com/api/v1/webinars?status=published"
        );


        if (response.data.success && response.data.data) {
          // Filter webinars by instructor name (case-insensitive)
          const filteredWebinars = response.data.data.filter(
            (webinar) =>
              webinar.instructor?.name?.toLowerCase() === instructorName.toLowerCase()
          );

          // Remove duplicates based on webinar _id
          const uniqueWebinars = filteredWebinars.filter(
            (webinar, index, self) =>
              index === self.findIndex((w) => w._id === webinar._id)
          );

          console.log(`Found ${uniqueWebinars.length} webinars for instructor "${instructorName}":`, uniqueWebinars);
          setWebinars(uniqueWebinars);
          setError(null);
        } else {
          setError("Failed to fetch webinars");
        }
      } catch (error) {
        console.error("Error fetching webinars:", error);
        setError(error.response?.data?.message || error.message || "Error fetching webinars");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, [instructorName]); // Re-run when instructorName changes

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading webinars...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (webinars.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No webinars found for {instructorName || "this instructor"}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel className="mt-6 md:mt-14 w-full">
        <CarouselContent>
          {webinars.map((webinar) => (
            <CarouselItem key={webinar._id} className="basis-full md:basis-1/2 lg:basis-1/3">
              <WebinarCard webinar={webinar} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {webinars.length > 3 && (
          <>
            <CarouselPrevious className="-left-10 hidden md:flex" />
            <CarouselNext className="-right-10 hidden md:flex" />
          </>
        )}
      </Carousel>

      {/* Mobile navigation dots */}
      {webinars.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {webinars.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index === 0 ? "bg-blue-600" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}