// app/webinar-room/page.jsx
"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/webinar-room/banner/banner";
import BannerCTA from "@/components/webinar-room/bannerCTA/bannerCTA";
import { Toaster, toast } from 'react-hot-toast';
import WebinarsSection from "@/components/webinar-room/webinarsSection/webinarsSection";

const API_BASE_URL = "https://shekhai-server.onrender.com/api/v1";

export default function WebinarRoomPage() {
  const [webinars, setWebinars] = useState([]);
  const [featuredWebinar, setFeaturedWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all webinars
  const fetchWebinars = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/webinars?status=published`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        const allWebinars = result.data || [];
        setWebinars(allWebinars);

        // Find a featured webinar or use the first one
        const featured = allWebinars.find(webinar => webinar.isFeatured) || allWebinars[0];
        setFeaturedWebinar(featured);

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

  // Fetch featured webinars
  const fetchFeaturedWebinars = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/webinars/featured`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data && result.data.length > 0) {
        setFeaturedWebinar(result.data[0]);
      }
    } catch (error) {
      console.error("Error fetching featured webinars:", error);
      // Don't show error for this, use fallback
    }
  };

  useEffect(() => {
    fetchWebinars();
    fetchFeaturedWebinars();
  }, []);

  if (loading) {
    return (
      <main className="page-body">
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading webinars...</p>
          </div>
        </div>
        <Toaster position="top-right" />
      </main>
    );
  }

  return (
    <main className="page-body">
      {featuredWebinar && (
        <Banner webinar={featuredWebinar} />
      )}

      <WebinarsSection webinars={webinars} />
      <BannerCTA />

      <Toaster position="top-right" />
    </main>
  );
}