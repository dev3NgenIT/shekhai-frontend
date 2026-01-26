import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header({ data }) {
  return (
    <div className="flex items-end justify-between md:items-center">
      <div>
        <h2 className="mt-2 text-xl font-medium text-title-one md:text-[2.5rem]">
          {data.title}
        </h2>
      </div>

      <Link href="/courses">
        <Button variant="outline" className={"px-2.5 py-1.5 text-xs"}>
          View all Courses
        </Button>
      </Link>
    </div>
  );
}
