"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Award, BookOpen, Users, Star, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function MentorProfile({ course }) {
  const [showFullBio, setShowFullBio] = useState(false);
  const [instructorDetails, setInstructorDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get instructor data from course
  const instructor = course?.instructor;

  // Fetch detailed instructor data when instructor ID is available
  useEffect(() => {
    const fetchInstructorDetails = async () => {
      if (!instructor?._id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://shekhai-server.onrender.com/api/v1/users/instructors/public/${instructor._id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch instructor details");
        }

        const data = await response.json();

        if (data.success && data.instructor) {
          setInstructorDetails(data.instructor);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching instructor details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorDetails();
  }, [instructor?._id]);

  // If no instructor data, show a placeholder
  if (!instructor) {
    return (
      <Card className="gap-0 rounded-sm border-0 p-6 shadow-none">
        <h3 className="mb-6 text-xl font-semibold text-base">
          About Instructor
        </h3>

        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-4 h-20 w-20 rounded-full bg-gray-200"></div>
          <div className="h-4 w-32 rounded bg-gray-200"></div>
          <div className="mt-2 h-3 w-24 rounded bg-gray-200"></div>
          <p className="mt-4 text-center text-sm text-gray-500">
            Instructor information not available
          </p>
        </div>
      </Card>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <Card className="gap-0 rounded-sm border-0 p-6 shadow-none">
        <h3 className="mb-6 text-xl font-semibold text-base">
          About Instructor
        </h3>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-4 h-20 w-20 animate-pulse rounded-full bg-gray-200"></div>
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
          <div className="mt-2 h-3 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="mt-4 h-16 w-full animate-pulse rounded bg-gray-200"></div>
        </div>
      </Card>
    );
  }

  // Use detailed instructor data if available, otherwise fallback to basic instructor data
  const detailedInstructor = instructorDetails || instructor;

  // Get instructor initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "IN";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle email click
  const handleEmailClick = () => {
    if (detailedInstructor.email) {
      window.location.href = `mailto:${detailedInstructor.email}?subject=Question about ${course?.title || "your course"}`;
    }
  };

  // Format join date
  const formatJoinDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  // Calculate stats (you can replace these with actual data if available from API)
  const stats = {
    totalStudents: 1250, // This should come from API if available
    totalCourses: 8,      // This should come from API if available
    rating: 4.8,          // This should come from API if available
    reviews: 342,         // This should come from API if available
  };

  // Bio from API
  const bio = detailedInstructor.bio || "No bio available";

  return (
    <Card className="gap-0 rounded-sm border-0 p-6 shadow-none">
      <h3 className="mb-6 text-xl font-semibold text-base">About Instructor</h3>

      {/* Instructor Info */}
      <div className="mb-6 flex items-start gap-4">
        <Avatar className="h-20 w-20 border-2 border-base/10">
          <AvatarImage
            src={detailedInstructor.avatarUrl}
            alt={detailedInstructor.name}
          />
          <AvatarFallback className="bg-base text-white">
            {getInitials(detailedInstructor.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="text-lg font-semibold">{detailedInstructor.name}</h4>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              {detailedInstructor.role || "Instructor"}
            </Badge>
          </div>

          <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-3 w-3" />
            <span className="truncate">{detailedInstructor.email}</span>
          </div>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(stats.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{stats.rating}</span>
            <span className="text-sm text-gray-500">
              ({stats.reviews} reviews)
            </span>
          </div>

          {/* Join Date */}
          {detailedInstructor.createdAt && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>Joined {formatJoinDate(detailedInstructor.createdAt)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <Users className="mx-auto mb-1 h-5 w-5 text-blue-600" />
          <div className="text-lg font-bold">
            {stats.totalStudents.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Students</div>
        </div>

        <div className="rounded-lg bg-green-50 p-3 text-center">
          <BookOpen className="mx-auto mb-1 h-5 w-5 text-green-600" />
          <div className="text-lg font-bold">{stats.totalCourses}</div>
          <div className="text-xs text-gray-600">Courses</div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 text-center">
          <Award className="mx-auto mb-1 h-5 w-5 text-purple-600" />
          <div className="text-lg font-bold">Expert</div>
          <div className="text-xs text-gray-600">Level</div>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <h5 className="mb-3 font-medium text-gray-700">About</h5>
        <p className={`text-gray-600 ${!showFullBio && "line-clamp-3"}`}>
          {bio}
        </p>
        {bio.length > 150 && (
          <button
            onClick={() => setShowFullBio(!showFullBio)}
            className="mt-2 text-sm font-medium text-base hover:underline"
          >
            {showFullBio ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Contact Section */}
      <div className="border-t pt-4">
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Instructor Email</p>
              <p className="text-sm font-medium">{detailedInstructor.email}</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(detailedInstructor.email);
                alert("Email copied to clipboard!");
              }}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}