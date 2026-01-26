"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

const tags = [
  "Web Development",
  "Mobile Apps",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Blockchain",
  "Frontend Development",
  "Cybersecurity",
  "UI/UX Design",
  "Cloud Computing",
  "Backend Development",
];

export default function Tags() {
  const [selectedTags, setSelectedTTags] = useState([]);
  return (
    <div className="mt-3 flex max-h-[110px] flex-wrap gap-2 overflow-hidden px-3 md:mt-10 md:max-h-[124px] md:gap-4 md:px-0">
      {tags.map((tag) => (
        <Badge
          key={tag}
          className={cn(
            "cursor-pointer rounded-full border-base px-3 py-1 text-[14px] duration-300 hover:text-white md:px-7 md:py-3 md:text-lg",
            selectedTags.includes(tag)
              ? "bg-base text-white"
              : "bg-transparent text-black",
          )}
          onClick={() => {
            setSelectedTTags((prev) =>
              prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag],
            );
          }}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
