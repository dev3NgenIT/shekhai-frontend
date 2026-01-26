import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Calendar, Clock, Video } from "lucide-react";

const SessionOption = ({
  id,
  label,
  checked,
  onChange,
  showHoverCard = false,
}) => {
  const hoverCardContent = (
    <HoverCardContent className="w-80 p-4">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-[#3B5998]">{label}</h3>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Aug 5, 2025</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>11:00 PM</span>
          </div>
        </div>

        <div className="mb-2 text-right text-sm text-gray-600">
          <div>Duration: 2 Hours</div>
          <div>Host: Anisur Rahman</div>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm text-gray-600">Platform:</span>
          <div className="flex items-center gap-1">
            <div className="rounded-full bg-blue-500 p-1">
              <Video className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium">Zoom Meeting</span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-gray-600">
          Strengthen your fundamentals in algebra and geometry through hands-on
          exercises, real-world problem scenarios, and live instructor feedback.
          This session includes guided practice, quick tips for exam
          preparation, and interactive group problem-solving.
        </p>

        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary" className="bg-blue-50 text-[#3B5998]">
            Free Session
          </Badge>
          <Button
            size="sm"
            className="bg-[#3B5998] text-white hover:bg-[#2d4373]"
          >
            Register Now
          </Button>
        </div>
      </div>
    </HoverCardContent>
  );

  if (showHoverCard) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex cursor-pointer items-center space-x-2">
            <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
            <label
              htmlFor={id}
              className="cursor-pointer font-medium text-[#3B5998]"
            >
              {label}
            </label>
          </div>
        </HoverCardTrigger>
        {hoverCardContent}
      </HoverCard>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <label htmlFor={id} className="cursor-pointer font-medium text-[#3B5998]">
        {label}
      </label>
    </div>
  );
};

export default SessionOption;
