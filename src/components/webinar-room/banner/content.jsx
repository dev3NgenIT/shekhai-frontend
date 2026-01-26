// components/webinar-room/banner/content.jsx
"use client";

import { Badge } from "@/components/ui/badge";
import {
  LuAlarmClock,
  LuCalendar,
  LuMapPin,
  LuUser,
  LuCheckCircle,
  LuUsers,
  LuZap,
} from "react-icons/lu";
import { useState } from "react";
import { LucideCheckCircle } from "lucide-react";

export default function Content({ webinar }) {
  const [hoveredElement, setHoveredElement] = useState(null);

  if (!webinar) return null;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "To be announced";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "TBA";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate duration
  const getDuration = () => {
    if (!webinar.startTime || !webinar.endTime) return "1 hour";
    const start = new Date(webinar.startTime);
    const end = new Date(webinar.endTime);
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) return `${minutes} minutes`;
    if (minutes === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    return `${hours}h ${minutes}m`;
  };

  // Calculate days remaining
  const getDaysRemaining = () => {
    if (!webinar.startTime) return null;
    const start = new Date(webinar.startTime);
    const now = new Date();
    const diffTime = start - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div className="space-y-8">
      {/* Badge & Status */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
          onMouseEnter={() => setHoveredElement("badge")}
          onMouseLeave={() => setHoveredElement(null)}
        >
          {webinar.badge || "Premium Webinar"}
          <span className="absolute inset-0 translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0"></span>
        </Badge>

        {webinar.isFeatured && (
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md">
            <LuZap className="mr-1 h-3 w-3" />
            Featured
          </Badge>
        )}

        {daysRemaining > 0 && daysRemaining <= 7 && (
          <Badge className="animate-pulse bg-gradient-to-r from-pink-500 to-rose-600 text-white">
            {daysRemaining === 1 ? "Tomorrow!" : `${daysRemaining} days left`}
          </Badge>
        )}
      </div>

      {/* Title */}
      <h1 className="text-4xl leading-tight font-bold text-white sm:text-5xl md:text-6xl lg:text-5xl">
        {webinar.title.split(" ").map((word, index) => (
          <span
            key={index}
            className="inline-block transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
            onMouseEnter={() => setHoveredElement(`word-${index}`)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            {word}{" "}
          </span>
        ))}
      </h1>

      {/* Description */}
      <p className="text-xl leading-relaxed text-gray-300 lg:text-2xl">
        {webinar.shortDescription}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
        <div
          className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10"
          onMouseEnter={() => setHoveredElement("date")}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/30 p-2">
              <LuCalendar className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Date</p>
              <p className="text-lg font-semibold text-white">
                {formatDate(webinar.startTime)}
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10"
          onMouseEnter={() => setHoveredElement("time")}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/30 p-2">
              <LuAlarmClock className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Time</p>
              <p className="text-lg font-semibold text-white">
                {formatTime(webinar.startTime)} • {getDuration()}
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10"
          onMouseEnter={() => setHoveredElement("location")}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/30 p-2">
              <LuMapPin className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Location</p>
              <p className="text-lg font-semibold text-white">Online</p>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10"
          onMouseEnter={() => setHoveredElement("participants")}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-600/30 p-2">
              <LuUsers className="h-5 w-5 text-pink-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Participants</p>
              <p className="text-lg font-semibold text-white">
                {webinar.currentParticipants || 0}/
                {webinar.maxParticipants || "∞"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor & Price Section */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Instructor */}
        <div
          className="group flex items-center gap-4"
          onMouseEnter={() => setHoveredElement("instructor")}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <div className="relative">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white/20 p-0.5 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/50">
              {webinar.instructor?.avatar ? (
                <img
                  src={webinar.instructor.avatar}
                  alt={webinar.instructor.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-xl font-bold text-white">
                  {webinar.instructor?.name?.charAt(0) || "E"}
                </div>
              )}
            </div>
            <div className="absolute -right-1 -bottom-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
              <LuUser className="h-3 w-3 text-white" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">
              Expert Instructor
            </p>
            <p className="text-xl font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent">
              {webinar.instructor?.name || "Industry Leader"}
            </p>
            <p className="text-gray-300">
              {webinar.instructor?.title || "Senior Professional"}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4">
          <div
            className="text-center"
            onMouseEnter={() => setHoveredElement("price")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <p className="text-sm font-medium text-gray-400">
              Registration Fee
            </p>
            <div className="flex items-baseline gap-2">
              {webinar.isFree ? (
                <>
                  <span className="text-4xl font-bold text-green-400">
                    FREE
                  </span>
                  <span className="text-sm text-gray-400">
                    No payment required
                  </span>
                </>
              ) : (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ${webinar.price * 1.2}
                  </span>
                  <span className="text-4xl font-bold text-white">
                    ${webinar.price}
                  </span>
                  <span className="text-sm text-gray-400">per person</span>
                </>
              )}
            </div>
            {!webinar.isFree && (
              <p className="mt-1 text-sm text-gray-400">Limited time offer</p>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      {/* <div className="pt-4">
        <p className="mb-3 text-sm font-medium text-gray-400">What's included:</p>
        <div className="flex flex-wrap gap-3">
          {[
            "Live Q&A Session",
            "Certificate of Completion",
            "Recording Access",
            "Digital Materials",
            "Networking Session"
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
              onMouseEnter={() => setHoveredElement(`feature-${index}`)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <LucideCheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm text-white">{feature}</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
