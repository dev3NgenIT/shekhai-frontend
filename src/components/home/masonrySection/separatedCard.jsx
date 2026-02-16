import { cn } from "@/lib/utils";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function SeparatedCard({ data: category, isReversed = false }) {
  // Check if category exists
  if (!category) {
    return (
      <div className="flex h-[14.875rem] items-center justify-center rounded-lg bg-gray-100 p-6">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  // Extract category data with fallbacks
  const categoryName = category?.name || "Unnamed Category";
  const categoryDescription = category?.description || "No description available";
  const categoryColor = category?.color || "#1b1674";
  const coursesCount = category?.courses_count || 0;
  const categoryIcon = category?.icon;

  // Create URL slug
  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
  const categoryUrl = `/categories/${categorySlug}`;

  return (
    <div
      className={cn(
        "group flex h-[14.875rem] gap-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md",
        isReversed ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Content Section - Fixed width */}
      <div 
        className="relative h-full w-[17.625rem] p-6 transition-colors duration-300 group-hover:bg-opacity-95"
        style={{ backgroundColor: `${categoryColor}08` }}
      >
        <Link
          href={categoryUrl}
          className="text-[16px] font-medium text-title-one hover:text-title-one/80 transition-colors"
        >
          {categoryName}
        </Link>

        <p className="mt-3.5 line-clamp-[7] text-sm text-gray-600">
          {categoryDescription}
        </p>

        {/* Courses count badge */}
        {coursesCount > 0 && (
          <div className="absolute bottom-6 left-6">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
              {coursesCount} {coursesCount === 1 ? 'course' : 'courses'}
            </span>
          </div>
        )}

        {/* Icon indicator */}
        {categoryIcon && (
          <div className="absolute bottom-6 right-6 opacity-40">
            <div 
              className="h-6 w-6"
              dangerouslySetInnerHTML={{ __html: categoryIcon }}
            />
          </div>
        )}
      </div>

      {/* Image Section - Flexible width */}
      <div className="relative flex-1 overflow-hidden">
        {/* Color gradient background */}
        <div 
          className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
          style={{ 
            background: `linear-gradient(135deg, ${categoryColor}15 0%, ${categoryColor}08 100%)`,
            backgroundColor: `${categoryColor}10`
          }}
        />

        {/* Icon/Letter display */}
        <div className="absolute inset-0 flex items-center justify-center">
          {categoryIcon ? (
            <div 
              className="h-32 w-32 opacity-20 transition-all duration-500 group-hover:opacity-30 group-hover:scale-110"
              dangerouslySetInnerHTML={{ __html: categoryIcon }}
            />
          ) : (
            <div 
              className="text-7xl font-bold opacity-20 transition-all duration-500 group-hover:opacity-30 group-hover:scale-110"
              style={{ color: categoryColor }}
            >
              {categoryName.charAt(0)}
            </div>
          )}
        </div>

        {/* Bottom link bar - Desktop */}
        <Link
          href="/courses"
          className="absolute bottom-0 left-0 hidden h-[3.75rem] w-full items-center justify-between bg-gradient-to-t from-white/95 to-white/85 px-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/95 group-hover:translate-y-0 md:flex"
        >
          <span className="text-[15px] font-medium text-title-one">
            {categoryName}
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-base bg-white shadow-sm transition-all duration-300 group-hover:bg-title-one group-hover:text-white">
            <IoIosArrowForward className="size-4 text-base transition-colors duration-300" />
          </div>
        </Link>

        {/* Full card link for mobile */}
        <Link
          href={categoryUrl}
          className="absolute inset-0 md:hidden"
          aria-label={`View ${categoryName} category`}
        />
      </div>
    </div>
  );
}