
import Stars from "../../Shared/Stars/stars";
import Image from "next/image";
import Link from "next/link";


export default function CarouselCard({ course, index }) {
  // Extract course data with fallbacks
  const {
    _id,
    title,
    shortDescription,
    instructor,
    price,
    level,
    bannerImage
  } = course;

  // Extract image URL from bannerImage object
  const getImageUrl = () => {
    if (bannerImage && bannerImage.data) {
      // If it's a base64 image
      return bannerImage.data;
    }
    // Fallback image
    return "/chef-2.png";
  };

  // Format price
  const formattedPrice = price ? `$${price.toFixed(2)}` : "Free";

  // Get instructor name
  const instructorName = instructor?.name || "Expert Instructor";

  console.log(course); // For debugging

  return (
    <div className="flex h-[6.5rem] w-[18.125rem] items-center gap-x-2 rounded-2xl border border-stroke bg-title-light p-2">
      <Image
        alt={title || "course thumbnail"}
        src={getImageUrl()}
        width={88}
        height={88}
        className="size-[5.5rem] rounded-[0.625rem] object-cover"
      />

      <div className="flex-1">
        <Link
          href={`/courses/${_id || ''}`}
          className="text-lg font-semibold hover:text-primary transition-colors line-clamp-1"
        >
          {title || "Course Title"}
        </Link>
        
        <p className="text-sm text-[#898787] line-clamp-1">
          {instructorName}
        </p>
        
        <div className="flex items-center gap-2 mt-1">
          <Stars count={3} size="sm" />
          <span className="text-xs text-gray-500">{formattedPrice}</span>
        </div>

        {level && (
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full mt-1 inline-block">
            {level}
          </span>
        )}
      </div>
    </div>
  );
}