import { Input } from "@/components/ui/input";
import { FaHandPointRight } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-between border-b pb-10 md:flex-row">
      <p className="flex items-center gap-2 gap-x-2 md:text-2xl">
        <FaHandPointRight className="text-2xl text-base" />
        <span>Discover Questions and Answers You’re Looking For</span>
      </p>

      {/* <div className="relative mt-3 w-[350px] shrink-0 md:w-[465px]">
        <Input className="h-[3rem] rounded-full bg-white text-primary" />
        <IoSearchOutline className="absolute top-1/2 right-3 -translate-y-1/2 text-2xl" />
      </div> */}
    </div>
  );
}
