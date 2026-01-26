"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import MeetingDate from "./meetingDate/meetingDate";
import MeetingMedium from "./meetingMedium";
import MeetingTime from "./meetingTime/meetingTime";

export default function Form() {
  const [data, setData] = useState({
    instructor: "",
    method: "video",
    date: "",
    time: "",
  });

  return (
    <form className="flex flex-col gap-y-12 py-5 md:mt-12">
      {/* Instructor */}
      <div>
        <Label className="font-semibold text-[#1E293B]">Instructor</Label>
        <Select>
          <SelectTrigger className="mt-3 w-full rounded border-none bg-[#F1F5F9] shadow-none">
            <SelectValue placeholder="Wade Warren" />
          </SelectTrigger>
          <SelectContent className="shadow-none">
            <SelectItem value="Hero Alam">Hero Alam</SelectItem>
            <SelectItem value="John Doe">John Doe</SelectItem>
            <SelectItem value="Jane Doe">Jane Doe</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Meeting medium */}
      <MeetingMedium />

      {/* Meeting date */}
      <MeetingDate />

      {/* Meeting time */}
      <MeetingTime />

      {/* Book now */}
      <Button className="w-full rounded bg-[#234A96]">Book Now</Button>
    </form>
  );
}
