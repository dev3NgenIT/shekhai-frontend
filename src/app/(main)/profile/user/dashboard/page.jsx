import DashboardBanner from "@/components/profile/user/dashboard/Banner";
import CourseProgress from "@/components/profile/user/dashboard/CourseProgress";
import Courses from "@/components/profile/user/dashboard/Courses";
import MentorTable from "@/components/profile/user/dashboard/MentorTable";
import RightSidebar from "@/components/profile/user/dashboard/RightSidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="grid w-full grow grid-cols-1 gap-6 pt-1 lg:grid-cols-4">
      <section className="space-y-6 lg:col-span-3">
        <div className="relative w-full bg-white">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search your course here..."
            className="border-gray-300 pl-10 text-lg"
          />
        </div>

        <DashboardBanner />

        <CourseProgress />

        <Courses />

        <MentorTable />
      </section>

      <RightSidebar />
    </div>
  );
}
