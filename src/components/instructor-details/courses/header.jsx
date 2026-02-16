import { TiStar } from "react-icons/ti";

export default function Header({ instructor }) {
  return (
    <header className="md:w-[47.5rem]">
      <h2 className="text-2xl font-medium md:text-3xl">
        Courses by {instructor?.name || "Wade Warren"}
      </h2>
      <p className="mt-1.5 w-full text-[#898787] md:mt-3.5 md:text-card-title">
        {instructor?.bio || "Wade Warren"}
      </p>

      {/* <div className="mt-1.5 md:mt-3.5 flex items-center gap-x-1 text-body">
        <TiStar className="text-3xl text-[#234A96]" />
        <span>4.5</span>
        <span className="text-[#898787]">(1.2k Reviews)</span>
      </div> */}
    </header>
  );
}
