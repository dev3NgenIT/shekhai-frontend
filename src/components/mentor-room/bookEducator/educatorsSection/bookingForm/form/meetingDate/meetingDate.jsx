import { Label } from "@/components/ui/label";
import { format, nextDay } from "date-fns";
import { useEffect, useState } from "react";
import DateOption from "./dateOption";
import OtherDate from "./otherDate";

export default function MeetingDate() {
  const [date, setDate] = useState(null);

  useEffect(() => {
    const now = new Date();
    setDate(now);
  }, []);

  return (
    <section>
      <Label className="font-semibold text-[#1E293B]">Date</Label>

      <div className="mt-[1.375rem] flex items-center justify-between">
        {date &&
          Array.from({ length: 3 }).map((_, index) => (
            <DateOption key={index}>
              {format(nextDay(date, index), "dd EEEEEE")
                .split(" ")
                .map((el) => (
                  <span
                    key={el}
                    className="first-of-type:text-lg first-of-type:font-medium"
                  >
                    {el}
                  </span>
                ))}
            </DateOption>
          ))}

        <OtherDate />
      </div>
    </section>
  );
}
