import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { LuAlarmClock, LuTag } from "react-icons/lu";

export default function WebinarCard() {
  return (
    <Card className="border-stroke py-4 text-start shadow-none">
      <CardContent className="px-4">
        <Image
          src="/educator.png"
          alt="mentor image"
          width={352}
          height={212}
          className="h-[212px] w-[352px] rounded-sm"
        />

        <CardTitle className="mt-5">
          <h4 className="text-lg leading-normal font-medium text-title-one">
            Webinar Title
          </h4>
          <p className="text-sm font-medium text-text-dark">
            Managing Teams in a Digital Age
          </p>
        </CardTitle>

        <CardDescription className="mt-3 border-t border-stroke pt-3">
          <p className="line-clamp-4 text-description text-gray">
            This session will explore strategies for remote communication,
            building trust, managing performance, and fostering a strong team
            culture in a digital work environment.
          </p>

          <div className="mt-8 flex justify-between border-t border-stroke pt-3">
            <p className="flex items-center gap-x-1">
              <LuAlarmClock className="size-[1.625rem] text-base" />
              <span className="text-[#181818]">7:00 PM ( May 5, 2025)</span>
            </p>
            <p className="flex items-center gap-x-1">
              <LuTag className="size-[1.625rem] text-base" />
              <span className="text-[#181818]">BDT 2000</span>
            </p>
          </div>
        </CardDescription>

        <CardFooter className="mt-8 px-0">
          <Button className="w-full">Register Now</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
