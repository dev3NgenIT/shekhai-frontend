"use client"
import BookEducator from "@/components/Mentor-room/bookEducator/bookEducator";
import CategoryHero from "@/components/Mentor-room/categoryHero/categoryHero";
import CategorySlider from "@/components/Mentor-room/categorySlider/categorySlider";
import GroupSession from "@/components/Mentor-room/groupSession/groupSession";
import Hero from "@/components/Mentor-room/hero/hero";
import PopularInstructor from "@/components/Mentor-room/popularEducators/popularEducators";
import SkillCTA from "@/components/Mentor-room/skillCTA/skillCTA";
import WebinarsSection from "@/components/webinar-room/webinarsSection/webinarsSection";
import { useEffect, useState } from 'react';

const API_BASE_URL = 'https://shekhai-server.onrender.com/api/v1/mentor-room';

export default function Page() {
  const [mentorData, setMentorData] = useState(null);
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorRoomData = async () => {
      try {

        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setMentorData(result.data);
          console.log('Data loaded successfully:', result.data);
        } else {
          setError('No data found');
          console.log('No data found or success is false');
        }

      } catch (error) {
        console.error('Error fetching mentor room data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchWebinars = async () => {
      setLoading(true);
      setError(null);

      try {

        const response = await fetch(`https://shekhai-server.onrender.com/api/v1/webinars?status=published`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          const allWebinars = result.data || [];
          setWebinars(allWebinars);
        } else {
          throw new Error(result.message || "Failed to load webinars");
        }
      } catch (error) {
        console.error("Error fetching webinars:", error);
        setError(error.message);
        toast.error("Failed to load webinars");
        setWebinars([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWebinars();
    fetchMentorRoomData();
  }, []);


  if (loading) {
    return (
      <div className="page-body flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading mentor data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-body flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p className="text-lg font-semibold">Error loading data</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="page-body">
      {/* Pass data to Hero component */}
      <Hero mentorData={mentorData} />
      {/* You can pass data to other components as well */}
      <CategoryHero mentorData={mentorData} />
      <CategorySlider mentorData={mentorData} />
      <PopularInstructor />
      <BookEducator />
      <SkillCTA mentorData={mentorData} />
      <GroupSession mentorData={mentorData} />
      <div className="mt-20">
        <WebinarsSection webinars={webinars} />
      </div>
    </main>
  );
}