import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TimeTrigger({ label }) {
  return (
    <div className="flex flex-col gap-y-1">
      <small className="text-xs font-medium text-[#94A3B8]">{label}</small>

      <Popover>
        <PopoverTrigger>
          <h2 className="cursor-pointer text-2xl font-bold text-[#1E293B]">
            12:00
          </h2>
        </PopoverTrigger>

        <PopoverContent className="w-[12rem] pr-0.5">
          {/* Label */}
          <h4 className="text-xs font-semibold">
            Select {label} Time{" "}
            <Tooltip>
              <TooltipTrigger asChild>
                <span> (UTC)</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Universal Time</p>
              </TooltipContent>
            </Tooltip>
          </h4>

          <ScrollArea className="mt-4 h-56 w-full">
            <div className="pr-3">
              {/* Time */}
              <div className="grid w-full grid-cols-3 gap-1">
                {Array.from({ length: 24 }).map((_, index) => (
                  <span
                    key={index}
                    className="cursor-pointer bg-gray-100 p-1 text-sm font-medium text-[#4A4A4A] hover:bg-gray-200"
                  >{`${index < 10 ? `0${index}` : index}:00`}</span>
                ))}
              </div>
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
