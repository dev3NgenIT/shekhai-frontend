import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeAlert, Bell, Book } from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <Card className={"rounded-none border-0 border-l bg-white shadow-none"}>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" />
              <AvatarFallback>RB</AvatarFallback>
            </Avatar>
          </div>
          <div className="mb-4 text-center">
            <h3 className="font-semibold">Good Morning Robert</h3>
            <p className="text-sm text-gray-600">
              Continue Your Journey And Achieve Your Goals
            </p>
          </div>
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={
                "size-10 cursor-auto rounded-full hover:bg-white hover:text-[#0F68A0]"
              }
            >
              <Bell className="" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={
                "size-10 cursor-auto rounded-full hover:bg-white hover:text-[#0F68A0]"
              }
            >
              <Book className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={
                "size-10 cursor-auto rounded-full hover:bg-white hover:text-[#0F68A0]"
              }
            >
              <BadgeAlert className="h-4 w-4" />
            </Button>
          </div>

          <section className="mt-10">
            <h3 className="mb-4 font-semibold text-base">Your Mentor</h3>
            <div className="space-y-4">
              {[
                {
                  name: "Cody Fisher",
                  role: "Big Data Course - Beginner to Advance level",
                  badge: "New",
                },
                {
                  name: "Esther Howard",
                  role: "Graphic Design Masterclass - Object Oriented Design",
                  badge: "New",
                },
                {
                  name: "Theresa Webb",
                  role: "Instagram Marketing 2021: Complete Guide To Instagram Growth",
                  badge: "New",
                },
                {
                  name: "Darlene Robertson",
                  role: "PO for smaller Weekender Trips Course",
                  badge: "New",
                },
              ].map((mentor, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar className="mt-1 h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{mentor.name}</h4>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-xs text-blue-800"
                      >
                        {mentor.badge}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">
                      {mentor.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4 h-auto w-full rounded-full bg-base/20 p-0 py-2 text-sm text-[#0F68A0] hover:text-white">
              See All
            </Button>
          </section>

          <section className="mt-10">
            <h3 className="mb-4 font-semibold text-base">Your Courses</h3>
            <div className="space-y-4">
              {[
                {
                  name: "Frontend Development",
                  role: "Full Frontend Development Course",
                  badge: "New",
                },
                {
                  name: "MERN Stack Development",
                  role: "MERN Stack Development Course",
                  badge: "New",
                },
                {
                  name: "Marketing",
                  role: "A Complete Guide To Digital Marketing",
                  badge: "New",
                },
                {
                  name: "Instagram Marketing",
                  role: "Instagram Marketing 2021: Complete Guide To Instagram Growth",
                  badge: "New",
                },
              ].map((mentor, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar className="mt-1 h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{mentor.name}</h4>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">
                      {mentor.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4 h-auto w-full rounded-full bg-base/20 p-0 py-2 text-sm text-[#0F68A0] hover:text-white">
              See All
            </Button>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
