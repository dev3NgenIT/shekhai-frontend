import { Badge } from "@/components/ui/badge";

export default function LeftContent({ data }) {
  return (
    <div className="self-center px-5 pb-5 md:w-[277px] md:px-0 md:pb-0">
      {/* <Badge
        variant="outline"
        className="border-none px-4 py-2 text-[#234A96] hover:bg-white hover:text-title-one md:text-xl"
      >
        Become a Member
      </Badge> */}
      <h2 className="mt-2 md:mt-7 text-[34px] font-medium text-white">
        <span className="text-[56px] leading-none text-title-light">
          {data.title}
        </span>
      </h2>
    </div>
  );
}
