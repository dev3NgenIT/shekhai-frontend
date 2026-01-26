import { Search } from "lucide-react";
import { FaUserGraduate } from "react-icons/fa6";
import { Input } from "../ui/input";

export default function Header({
  searchQuery,
  onSearchChange,
  isSearching = false,
}) {
  return (
    <div className="flex flex-col items-center justify-between px-3 py-6 md:flex-row md:p-0">
      {/* Left side - Icon and Title */}
      <div className="flex items-center gap-3">
        <div className="size-6 text-blue-600 md:size-8">
          <FaUserGraduate className="h-full w-full text-base" />
        </div>
        <h1 className="text-sm font-medium text-[#626262] md:text-lg md:font-normal">
          Join a thriving network of 10,000+ learners
        </h1>
      </div>

      {/* Right side - Search */}
      <div className="relative mt-4 md:mt-0">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Select Category & Then Search Courses..."
          className="h-[50px] rounded-md border border-gray-500 py-2 pr-12 pl-4 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-[510px] md:text-lg"
        />
        <div className="absolute top-1/2 right-5 -translate-y-1/2 transform">
          {isSearching ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          ) : (
            <Search className="size-6 text-base" />
          )}
        </div>
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute top-1/2 right-12 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
