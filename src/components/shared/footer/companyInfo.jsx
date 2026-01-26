import Image from "next/image";
import { IoLocationSharp, IoMailOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";

export default function CompanyInfo({ data }) {
  return (
    <div className="col-span-2 space-y-1 md:col-span-1">
      <Image src="/logo.png" alt="logo" width={180} height={60} />

      <div className="flex items-center gap-x-2">
        <IoMailOutline className="text-xl" />
        {data.email}
      </div>

      <div className="flex items-center gap-x-1.5">
        <MdOutlinePhone className="text-xl" />
        {data.phone}
      </div>

      <div className="flex items-center gap-x-1.5">
        <IoLocationSharp className="text-xl" />
        {data.address}
      </div>
    </div>
  );
}
