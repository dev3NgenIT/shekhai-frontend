"use client";

import AnimatedInput from "@/components/shared/animatedInput/animatedInput";
import { useState } from "react";

export default function Content({ mentorData }) {
  const [query, setQuery] = useState("");

  return (
    <div className="w-[38.5rem] px-5 md:px-0">
      <h2 className="font-hanken_grotesk text-3xl leading-normal font-semibold text-title-light md:text-[2.5rem]">
        {mentorData?.title || "Discover Expert Mentors to Elevate Your Skills"}
      </h2>

      <p className="mt-[17px] text-sm leading-normal text-[#EEE] md:text-lg md:font-medium">
        {mentorData?.short_description ||
          "Connect with industry-leading mentors across various fields. Our mentors are here to guide you, share their expertise, and help you achieve your personal and professional goals. Whether you're looking to enhance your skills, gain insights, or receive personalized advice, our mentor room is the perfect place to start your journey."}
      </p>

      <div className="px-5 !text-sm">
        <AnimatedInput
          className="mx-0 mt-8"
          state={query}
          setState={setQuery}
          onSubmit={setQuery}
          sequence={[
            "I want to learn Cooking",
            1800, // Waits 1s
            "I want to learn Mathematics",
            1000, // Waits 1s
            "I want to learn Programming",
            2000, // Waits 2s
          ]}
        />
      </div>
    </div>
  );
}
