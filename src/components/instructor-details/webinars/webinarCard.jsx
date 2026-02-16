"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { LuAlarmClock, LuTag, LuUsers } from "react-icons/lu";

// Helper function to format date
const formatWebinarDate = (dateString) => {
  if (!dateString) return "TBD";

  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function WebinarCard({ webinar }) {
  // If webinar is not provided, don't render
  if (!webinar) return null;

  // Determine if webinar is free or has price
  const isFree = webinar.isFree === true;
  const price = isFree ? "Free" : webinar.price ? `BDT ${webinar.price}` : "Contact for price";

  // Get instructor info
  const instructorName = webinar.instructor?.name || "Instructor";
  const instructorAvatar = webinar.instructor?.avatar || "/educator.png";

  // Check registration status
  const isRegistrationOpen = webinar.registrationOpen !== false;
  const currentParticipants = webinar.currentParticipants || 0;
  const maxParticipants = webinar.maxParticipants || 0;
  const spotsLeft = maxParticipants - currentParticipants;

  return (
    <Card className="border-stroke py-4 text-start shadow-none h-full flex flex-col">
      <CardContent className="px-4 flex-1">
        {/* Banner Image */}
        <div className="relative">
          <Image
            src={webinar.bannerImage || webinar.thumbnail || "/webinar-placeholder.png"}
            alt={webinar.title || "Webinar"}
            width={352}
            height={212}
            className="h-[212px] w-full rounded-sm object-cover"
          />
          {/* Badge */}
          {webinar.badge && (
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {webinar.badge}
            </span>
          )}
        </div>

        <CardTitle className="mt-5">
          <h4 className="text-lg leading-normal font-medium text-title-one line-clamp-1">
            {webinar.title || "Webinar Title"}
          </h4>
          <p className="text-sm font-medium text-text-dark line-clamp-1">
            {webinar.shortDescription || "No description available"}
          </p>
        </CardTitle>

        <CardDescription className="mt-3 border-t border-stroke pt-3">
          {/* Instructor Info */}
          <div className="flex items-center gap-2 mb-3">
            <Image
              src={instructorAvatar}
              alt={instructorName}
              width={30}
              height={30}
              className="rounded-full w-8 h-8 object-cover"
            />
            <div>
              <p className="text-sm font-medium">{instructorName}</p>
              {webinar.instructor?.title && (
                <p className="text-xs text-gray-500">{webinar.instructor.title}</p>
              )}
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex items-center gap-x-2 mb-2">
            <LuAlarmClock className="size-5 text-base flex-shrink-0" />
            <span className="text-sm text-[#181818]">
              {formatWebinarDate(webinar.startTime)}
              {webinar.endTime && ` - ${formatWebinarDate(webinar.endTime).split(',')[0]}`}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-x-2 mb-2">
            <LuTag className="size-5 text-base flex-shrink-0" />
            <span className="text-sm text-[#181818] font-semibold">
              {price}
            </span>
          </div>

          {/* Participants */}
          {maxParticipants > 0 && (
            <div className="flex items-center gap-x-2 mb-2">
              <LuUsers className="size-5 text-base flex-shrink-0" />
              <span className="text-sm text-[#181818]">
                {spotsLeft > 0
                  ? `${spotsLeft} spots left (${currentParticipants}/${maxParticipants} registered)`
                  : "Fully booked"}
              </span>
            </div>
          )}

          {/* Tags */}
          {webinar.tags && webinar.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {webinar.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardDescription>

        <CardFooter className="mt-4 px-0">
          <Button
            className="w-full"
            disabled={!isRegistrationOpen || spotsLeft <= 0}
          >
            <Link href={`/webinar-room/${webinar._id}`}>
              {!isRegistrationOpen
                ? "Registration Closed"
                : spotsLeft <= 0
                  ? "Fully Booked"
                  : "Register Now"}
            </Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}