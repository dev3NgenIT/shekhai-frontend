import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoDiscordAlt, BiSolidPhoneCall } from "react-icons/bi";
import { IoMdMail, IoMdPin } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";

export default function InformationCard() {
  return (
    <Card className="h-[500px] justify-between overflow-hidden rounded-[0.625rem] bg-[#234A96] p-10 text-white md:h-[647px] md:w-[491px]">
      <CardHeader className="p-0">
        <h3 className="text-2xl font-medium">Contact Information</h3>
        <p className="text-text-light">Say something to start a live chat!</p>
      </CardHeader>

      <CardContent className="space-y-[3.125rem] px-0">
        <div className="flex gap-x-6">
          <BiSolidPhoneCall className="text-2xl" />
          <span>+1012 3456 789</span>
        </div>

        <div className="flex gap-x-6">
          <IoMdMail className="text-2xl" />
          <span>demo@gmail.com</span>
        </div>

        <div className="flex items-start gap-x-6">
          <IoMdPin className="text-4xl" />
          <span>
            132 Dartmouth Street Boston, Massachusetts 02156 United States
          </span>
        </div>
      </CardContent>

      <CardFooter className="relative gap-x-3 px-0">
        <AiOutlineTwitter className="cursor-pointer rounded-full bg-title-light p-1.5 text-3xl text-base" />
        <IoLogoInstagram className="cursor-pointer rounded-full bg-title-light p-1.5 text-3xl text-base" />
        <BiLogoDiscordAlt className="cursor-pointer rounded-full bg-title-light p-1.5 text-3xl text-base" />

        {/* Blobs */}
        <div className="absolute right-0 bottom-0 size-[138px] -translate-x-[40px] -translate-y-[40px] rounded-full bg-[#FFFFFF1F]" />
        <div className="absolute right-0 bottom-0 size-[269px] translate-x-[120px] translate-y-[120px] rounded-full bg-[#FFFFFF1F]" />
      </CardFooter>
    </Card>
  );
}
