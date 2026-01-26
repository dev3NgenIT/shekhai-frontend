import Link from "next/link";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Socials() {
  return (
    <div>
      <h3 className="mb-2.5 font-hanken_grotesk text-lg font-semibold capitalize">
        Social Profiles
      </h3>

      <div className="flex items-center gap-x-2.5">
        <Link
          href={"https://www.facebook.com/ngenitltd"}
          className="grid size-10 place-items-center rounded-sm border border-[#F1F1F3] bg-[#F7F7F8]"
        >
          <FaFacebook className="text-xl" />
        </Link>
        <Link
          href={"https://www.x.com/ngenit"}
          className="grid size-10 place-items-center rounded-sm border border-[#F1F1F3] bg-[#F7F7F8]"
        >
          <FaXTwitter className="text-xl" />
        </Link>
        <Link
          href={"https://www.linkedin.com/company/ngenitltd"}
          className="grid size-10 place-items-center rounded-sm border border-[#F1F1F3] bg-[#F7F7F8]"
        >
          <FaLinkedin className="text-xl" />
        </Link>
      </div>
    </div>
  );
}
