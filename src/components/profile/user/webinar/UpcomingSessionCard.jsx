import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video } from "lucide-react";

export default function UpcomingSessionCard() {
  return (
    <div className="rounded-md border bg-white p-4">
      <h3 className="text-lg font-semibold text-[#3B5998]">Math Workshop</h3>

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

      <div className="flex flex-col items-start justify-between pt-5 pb-2 md:flex-row">
        <div>
          <Badge
            variant="secondary"
            className="bg-blue-50 text-sm text-[#3B5998]"
          >
            Free Session
          </Badge>

          <div className="mt-2 mb-3 flex items-center gap-2">
            <span className="text-sm text-gray-600">Platform:</span>
            <div className="flex items-center gap-1">
              <div className="rounded-full bg-blue-500 p-1">
                <Video className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-medium">Zoom Meeting</span>
            </div>
          </div>
        </div>

        <div className="mb-2 text-sm text-gray-600 md:text-right">
          <div>Duration: 2 Hours</div>
          <div>Host: Anisur Rahman</div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-gray-600">
        Strengthen your fundamentals in algebra and geometry through hands-on
        exercises, real-world problem scenarios, and live instructor feedback.
        This session includes guided practice, quick tips for exam preparation,
        and interactive group problem-solving.
      </p>
    </div>
  );
}
