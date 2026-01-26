import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import React from "react";
import SessionOption from "./SessionOption";

const ActiveSessions = ({ onRegisterClick }) => {
  const [selectedSessions, setSelectedSessions] = React.useState({
    mathWorkshop: true,
    codingBootcamp: false,
    scienceLab: false,
    artDesign: false,
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
    <div className="mb-8">
      <div className="mb-6 flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full bg-[#3B5998] px-4 py-2 font-medium text-white">
          <Edit className="h-4 w-4" />
          Active
        </div>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <SessionOption
            id="math-workshop"
            label="Math Workshop"
            checked={selectedSessions.mathWorkshop}
            onChange={(checked) => handleSessionChange("mathWorkshop", checked)}
            showHoverCard={true}
          />
          <SessionOption
            id="coding-bootcamp"
            label="Coding Bootcamp Practice"
            checked={selectedSessions.codingBootcamp}
            onChange={(checked) =>
              handleSessionChange("codingBootcamp", checked)
            }
            showHoverCard={true}
          />
          <SessionOption
            id="science-lab"
            label="Science Lab Discussion"
            checked={selectedSessions.scienceLab}
            onChange={(checked) => handleSessionChange("scienceLab", checked)}
            showHoverCard={true}
          />
        </div>

        <div className="space-y-4">
          <SessionOption
            id="art-design"
            label="Art & Design Brainstorming"
            checked={selectedSessions.artDesign}
            onChange={(checked) => handleSessionChange("artDesign", checked)}
            showHoverCard={true}
          />
          <SessionOption
            id="geography-quiz"
            label="Geography Quiz Prep"
            checked={selectedSessions.geographyQuiz}
            onChange={(checked) =>
              handleSessionChange("geographyQuiz", checked)
            }
            showHoverCard={true}
          />
          <SessionOption
            id="data-science"
            label="Data Science Coding Session"
            checked={selectedSessions.dataScience}
            onChange={(checked) => handleSessionChange("dataScience", checked)}
            showHoverCard={true}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onRegisterClick}
          className="bg-[#3B5998] px-8 py-2 text-white hover:bg-[#2d4373]"
        >
          Register Now
        </Button>
      </div>
    </div>
  );
};

export default ActiveSessions;
