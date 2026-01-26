"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Function to get display text based on path
  const getDisplayText = (path) => {
    switch (path) {
      case "/privacy-policy":
        return "Privacy Policy";
      case "/refund-policy":
        return "Refund Policy";
      case "/terms-and-conditions":
        return "Terms & Conditions";
      default:
        return "Select Policy";
    }
  };

  // Handle navigation when option is selected
  const handleValueChange = (value) => {
    router.push(`/${value}`);
  };

  return (
    <Select onValueChange={handleValueChange} value={pathname.replace("/", "")}>
      <SelectTrigger className="flex h-[70px] w-full grow justify-center rounded-none border-0 border-y-2 text-lg shadow-none md:hidden">
        <SelectValue placeholder={getDisplayText(pathname)} />
      </SelectTrigger>

      <SelectContent className={""} align="center">
        <SelectItem value="privacy-policy">Privacy Policy</SelectItem>
        <SelectItem value="refund-policy">Refund Policy</SelectItem>
        <SelectItem value="terms-and-conditions">Terms & Conditions</SelectItem>
      </SelectContent>
    </Select>
  );
}
