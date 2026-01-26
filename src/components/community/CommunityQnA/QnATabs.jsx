import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IoIosBookmarks } from "react-icons/io";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { MdSlideshow } from "react-icons/md";
import { PiSealQuestionLight } from "react-icons/pi";

const categories = [
  {
    name: "General Discussion",
    icon: PiSealQuestionLight,
    description: "Chat about anything and everything related to learning.",
  },
  {
    name: "Course Help",
    icon: IoIosBookmarks,
    description:
      "Stuck on a lesson or assignment? Get help from peers and mentors here.",
  },
  {
    name: "Career Advice",
    icon: LiaHandsHelpingSolid,
    description:
      "Explore career paths, get resume tips, and prepare for your future.",
  },
  {
    name: "Project Showcase",
    icon: MdSlideshow,
    description: "Chat about anything and everything related to learning.",
  },
];

export default function QnATabs({ activeCategory, setActiveCategory }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:gap-6 px-5 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Card
          key={category.name}
          className={cn("flex cursor-pointer flex-col justify-center p-4", {
            "border-base/30 bg-base/10": activeCategory === category.name,
            "hover:bg-secondary hover:text-secondary-foreground":
              activeCategory !== category.name,
          })}
          onClick={() => setActiveCategory(category.name)}
        >
          <CardContent className="text-center">
            <category.icon
              className={cn(
                "mx-auto mb-2 text-3xl",
                activeCategory === category.name
                  ? "text-3xl text-[#0f68a0]"
                  : "text-primary",
              )}
            />
            <b className="mt-3.5 font-semibold">{category.name}</b>
            <p>{category.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
