// components/webinar-room/webinarsSection/webinarsSection.jsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LuAlarmClock,
  LuUsers,
  LuCalendar,
  LuStar,
  LuArrowRight,
  LuCheckCircle,
} from "react-icons/lu";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LucideCheckCircle } from "lucide-react";

const WebinarsSection = ({ webinars }) => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);

  // Format date and time - ADD THESE FUNCTIONS BACK
  const formatDateTime = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDuration = (start, end) => {
    if (!start || !end) return "1 hour";
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate - startDate;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
  };

  // Handle card click (entire card)
  const handleCardClick = (webinarId, webinarTitle) => {
    if (!webinarId) {
      toast.error("Webinar ID not available");
      return;
    }

    router.push(`/webinar-room/${webinarId}`);
  };

  // Handle button click (with toast notification)
  const handleButtonClick = (e, webinarId, webinarTitle) => {
    e.stopPropagation(); // Prevent card click
    if (!webinarId) {
      toast.error("Webinar ID not available");
      return;
    }

    toast.success(`Viewing details for "${webinarTitle}"`, {
      icon: "📖",
      duration: 2000,
    });

    setTimeout(() => {
      router.push(`/webinar-room/${webinarId}`);
    }, 100);
  };

  if (!webinars || webinars.length === 0) {
    return (
      <section className="flex w-full flex-col items-center justify-center gap-x-[5.125rem] p-5 px-[calc((100vw-1215px)/2)] py-20 text-center">
        <div className="py-12">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <LuCalendar className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            No Webinars Available
          </h2>
          <p className="mx-auto mt-2 max-w-md text-gray-600">
            We're preparing more exciting webinars. Check back soon for upcoming
            events!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white p-5 py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
            <LuStar className="mr-1 h-3 w-3" />
            Upcoming Events
          </Badge>
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Discover{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expert-Led
            </span>{" "}
            Webinars
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Join interactive sessions with industry leaders and expand your
            knowledge
          </p>
        </div>

        {/* Webinars Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {webinars.map((webinar, index) => (
            <div
              key={webinar._id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl cursor-pointer"
              onMouseEnter={() => setHoveredCard(webinar._id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(webinar._id, webinar.title)}
              style={{
                transform:
                  hoveredCard === webinar._id
                    ? "translateY(-8px)"
                    : "translateY(0)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>

              {/* Webinar Image with Overlay */}
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent"></div>
                <img
                  src={webinar.thumbnail || "/images/webinar-default.jpg"}
                  alt={webinar.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  {webinar.isFeatured && (
                    <Badge className="border-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md">
                      <LuStar className="mr-1 h-3 w-3" />
                      Featured
                    </Badge>
                  )}
                  {webinar.isFree && (
                    <Badge className="border-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">
                      FREE
                    </Badge>
                  )}
                </div>

                {/* Category Badge */}
                <Badge className="absolute top-4 right-4 z-20 border-0 bg-black/60 text-white backdrop-blur-sm">
                  {webinar.badge || "Webinar"}
                </Badge>

                {/* Hover Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="-translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
                    <Button
                      className="bg-white font-semibold text-gray-900 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        handleButtonClick(e, webinar._id, webinar.title);
                      }}
                    >
                      Quick View
                      <LuArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Webinar Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                  {webinar.title}
                </h3>

                {/* Description */}
                <p className="mb-4 line-clamp-2 text-gray-600">
                  {webinar.shortDescription}
                </p>

                {/* Date & Time Info */}
                <div className="mb-4 rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                        <LuCalendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatDateTime(webinar.startTime)}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <LuAlarmClock className="h-3 w-3" />
                          {formatTime(webinar.startTime)} •{" "}
                          {getDuration(webinar.startTime, webinar.endTime)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md">
                    {webinar.instructor?.avatar ? (
                      <img
                        src={webinar.instructor.avatar}
                        alt={webinar.instructor.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-white">
                        {webinar.instructor?.name?.charAt(0) || "E"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {webinar.instructor?.name || "Expert Instructor"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {webinar.instructor?.title || "Industry Expert"}
                    </p>
                  </div>
                  {/* Rating Badge */}
                  <Badge
                    variant="outline"
                    className="border-blue-200 text-blue-700"
                  >
                    4.8 ★
                  </Badge>
                </div>

                {/* Footer Section */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    {/* Participants */}
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-r from-blue-400 to-purple-400 shadow-sm"
                          ></div>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">
                          {webinar.currentParticipants || 0}
                        </span>
                        <span className="mx-1">/</span>
                        <span>{webinar.maxParticipants || "∞"}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      {webinar.isFree ? (
                        <div className="text-lg font-bold text-green-600">
                          Free
                        </div>
                      ) : (
                        <>
                          <div className="text-2xl font-bold text-gray-900">
                            ${webinar.price}
                          </div>
                          <div className="text-xs text-gray-500">
                            per person
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="mt-4 w-full cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleButtonClick(e, webinar._id, webinar.title);
                    }}
                    type="button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Details
                      <LuArrowRight className="h-4 w-4 transition-transform duration-300 hover:translate-x-1" />
                    </span>
                  </Button>

                  {/* Quick Stats */}
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <LucideCheckCircle className="h-3 w-3 text-green-500" />
                      Certificate included
                    </span>
                    <span>•</span>
                    <span>Q&A Session</span>
                    <span>•</span>
                    <span>Recording access</span>
                  </div>
                </div>

                {/* Tags */}
                {webinar.tags && webinar.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {webinar.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-50 text-xs text-blue-700 hover:bg-blue-100"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {webinar.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{webinar.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Ribbon for Upcoming Soon */}
              {webinar.startTime && new Date(webinar.startTime) > new Date() &&
                new Date(webinar.startTime) <
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                  <div className="absolute top-6 -right-10 w-40 rotate-45 bg-gradient-to-r from-pink-500 to-rose-600 py-1 text-center text-xs font-semibold text-white shadow-lg">
                    Starting Soon
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebinarsSection;