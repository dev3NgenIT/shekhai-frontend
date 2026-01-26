"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Globe, Award, BookOpen, Users, Star } from "lucide-react";
import { useState } from "react";

export default function MentorProfile({ course }) {
  const [showFullBio, setShowFullBio] = useState(false);

  // Get instructor data from course
  const instructor = course?.instructor;

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
    if (instructor.email) {
      window.location.href = `mailto:${instructor.email}?subject=Question about ${course?.title || "your course"}`;
    }
  };

  // Handle view profile click
  const handleViewProfile = () => {
    if (instructor._id) {
      // You can navigate to instructor profile page
      // router.push(`/instructor/${instructor._id}`);

      // Or show a modal with more info
      alert(
        `Instructor Profile: ${instructor.name}\nEmail: ${instructor.email}\nRole: ${instructor.role}`,
      );
    }
  };

  // Example stats (you can fetch these from API if available)
  const stats = {
    totalStudents: 1250,
    totalCourses: 8,
    rating: 4.8,
    reviews: 342,
  };

  // Example bio (you might want to add bio field to instructor model)
  const bio =
    "Experienced instructor with years of industry knowledge. Passionate about teaching and helping students achieve their goals. Specializes in practical, hands-on learning experiences.";

  return (
    <Card className="gap-0 rounded-sm border-0 p-6 shadow-none">
      <h3 className="mb-6 text-xl font-semibold text-base">About Instructor</h3>

      {/* Instructor Info */}
      <div className="mb-6 flex items-start gap-4">
        <Avatar className="h-20 w-20 border-2 border-base/10">
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=103ABA&color=fff&bold=true`}
            alt={instructor.name}
          />
          <AvatarFallback className="bg-base text-white">
            {getInitials(instructor.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="text-lg font-semibold">{instructor.name}</h4>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              {instructor.role || "Instructor"}
            </Badge>
          </div>

          <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-3 w-3" />
            <span className="truncate">{instructor.email}</span>
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

      {/* Contact/Follow with email functionality */}
      <div className="border-t">
        {/* Email display (optional) */}
        <div className="mt-3 rounded-lg bg-gray-50 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Instructor Email</p>
              <p className="text-sm font-medium">{instructor.email}</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(instructor.email);
                alert("Email copied to clipboard!");
              }}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info (if available from API) */}
      {instructor.specialization && (
        <div className="mt-4 border-t pt-4">
          <h5 className="mb-2 font-medium text-gray-700">Specialization</h5>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(instructor.specialization) ? (
              instructor.specialization.map((spec, index) => (
                <Badge key={index} variant="outline" className="text-gray-600">
                  {spec}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="text-gray-600">
                {instructor.specialization}
              </Badge>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
