"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

export default function TestimonialCard({ items }) {
  const [imgError, setImgError] = useState(false);
  
  // Default fallback avatar
  const defaultAvatar = "/avatar.jpg";
  
  // Handle cases where items might be undefined or avatar missing
  const imageSrc = imgError 
    ? defaultAvatar 
    : (items?.avatar || defaultAvatar);
  
  // Ensure name and role have fallbacks
  const name = items?.name || "Anonymous";
  const role = items?.role || "Student";

  return (
    <Card className="border-0 py-8 shadow-none">
      <CardContent className="px-5">
        <p className="text-center text-body font-light text-gray italic">
          {items?.content || "No content provided"}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-center gap-x-2">
        <div className="relative">
          <Image
            src={imageSrc}
            alt={`${name}'s avatar`}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
        <div>
          <div>
            <p className="text-body text-text-dark">{name}</p>
          </div>
          <div>
            <small className="text-body text-sm text-text-dark">{role}</small>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}