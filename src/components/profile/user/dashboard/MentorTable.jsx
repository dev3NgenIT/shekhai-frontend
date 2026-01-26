import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function MentorTable() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Your Mentor</h3>
        <Button variant="link" className="text-sm text-base">
          See All
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="grid w-full grid-cols-4 gap-4 text-xs font-medium tracking-wider text-gray-500 uppercase">
                <div>INSTRUCTOR NAME & DATE</div>
                <div>COURSE TYPE</div>
                <div>COURSE TITLE</div>
                <div>ACTIONS</div>
              </div>
            </div>
            {[
              {
                name: "Jacob Jones",
                date: "26/2/2023",
                type: "TECH",
                title: "Angular Courses",
                action: "SHOW DETAILS",
              },
              {
                name: "Devon Lane",
                date: "26/2/2023",
                type: "PROGRAMMING",
                title: "Java Courses",
                action: "SHOW DETAILS",
              },
            ].map((mentor, index) => (
              <div
                key={index}
                id="mentor practice"
                className="grid grid-cols-4 items-center gap-4 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <Link href={"/instructors/jacob"}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <div className="text-sm font-medium">{mentor.name}</div>
                    <div className="text-xs text-gray-500">{mentor.date}</div>
                  </div>
                </div>
                <div>
                  <Badge
                    variant="secondary"
                    className="rounded-full border-0 bg-base/30 px-3 text-xs text-[#0f68a0] hover:bg-base/30"
                  >
                    {mentor.type}
                  </Badge>
                </div>
                <div className="text-sm font-medium">{mentor.title}</div>
                <div>
                  <Badge
                    variant="secondary"
                    className="rounded-full border-0 bg-base/30 px-3 text-xs text-[#0f68a0] hover:bg-base/30"
                  >
                    {mentor.action}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
