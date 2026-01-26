import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { useState } from "react";
import DateOption from "./dateOption";

export default function OtherDate() {
  const [date, setDate] = useState(new Date());

  return (
    <Popover>
      <PopoverTrigger>
        <DateOption>
          <span className="first-of-type:text-lg first-of-type:font-medium">
            Other
          </span>
          <span>Date</span>
        </DateOption>
      </PopoverTrigger>

      <PopoverContent>
        <Calendar mode="single" className="bg-[#F1F5F9]" />
      </PopoverContent>
    </Popover>
  );
}
