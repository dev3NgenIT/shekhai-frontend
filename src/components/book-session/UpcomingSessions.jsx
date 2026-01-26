import { Button } from "@/components/ui/button";
import { Bell, Clock4 } from "lucide-react";
import React from "react";
import SessionOption from "./SessionOption";

const UpcomingSessions = () => {
  const [selectedSessions, setSelectedSessions] = React.useState({
    mathWorkshop: true,
    codingBootcamp: true,
    scienceLab: false,
    artDesign: true,
    geographyQuiz: false,
    dataScience: false,
  });

  const handleSessionChange = (sessionKey, checked) => {
    setSelectedSessions((prev) => ({
      ...prev,
      [sessionKey]: checked,
    }));
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full bg-base px-4 py-2 font-medium text-white">
          <Clock4 className="h-4 w-4" />
          Upcoming
        </div>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <SessionOption
            id="upcoming-math"
            label="Math Workshop"
            checked={selectedSessions.mathWorkshop}
            onChange={(checked) => handleSessionChange("mathWorkshop", checked)}
          />
          <SessionOption
            id="upcoming-coding"
            label="Coding Bootcamp Practice"
            checked={selectedSessions.codingBootcamp}
            onChange={(checked) =>
              handleSessionChange("codingBootcamp", checked)
            }
          />
          <SessionOption
            id="upcoming-science"
            label="Science Lab Discussion"
            checked={selectedSessions.scienceLab}
            onChange={(checked) => handleSessionChange("scienceLab", checked)}
          />
        </div>

        <div className="space-y-4">
          <SessionOption
            id="upcoming-art"
            label="Art & Design Brainstorming"
            checked={selectedSessions.artDesign}
            onChange={(checked) => handleSessionChange("artDesign", checked)}
          />
          <SessionOption
            id="upcoming-geography"
            label="Geography Quiz Prep"
            checked={selectedSessions.geographyQuiz}
            onChange={(checked) =>
              handleSessionChange("geographyQuiz", checked)
            }
          />
          <SessionOption
            id="upcoming-data"
            label="Data Science Coding Session"
            checked={selectedSessions.dataScience}
            onChange={(checked) => handleSessionChange("dataScience", checked)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          className="border-base px-6 py-2 text-base hover:bg-base"
        >
          <Bell className="mr-2 h-4 w-4" />
          Get Notified for Upcoming
        </Button>
      </div>
    </div>
  );
};

export default UpcomingSessions;
