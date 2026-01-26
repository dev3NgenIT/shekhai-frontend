import { Label } from "@/components/ui/label";
import { IoIosArrowForward } from "react-icons/io";
import TimeTrigger from "./timeTrigger";

export default function MeetingTime() {
  return (
    <section>
      <Label className="font-semibold text-[#1E293B]">Select Time</Label>

      <div className="mt-4 flex h-[5.5rem] w-full items-center justify-between bg-[#F1F5F9] px-8">
        <TimeTrigger label="From" />
        <IoIosArrowForward className="text-2xl" />
        <TimeTrigger label="To" />
      </div>
    </section>
  );
}
