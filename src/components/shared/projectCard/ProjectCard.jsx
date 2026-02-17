"use client";
// ProjectCard.jsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast"; // Make sure to import toast

const ProjectCard = ({ course, categoryName }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const originalPrice = course.price * 1.2;

  // Handle banner image - check if it's an object with data or a URL string
  const getBannerSrc = () => {
    if (!course.bannerImage) return "";

    // If bannerImage is an object with data property (base64)
    if (typeof course.bannerImage === 'object' && course.bannerImage.data) {
      return course.bannerImage.data;
    }

    // If bannerImage is a direct URL string
    if (typeof course.bannerImage === 'string') {
      return course.bannerImage;
    }

    return "";
  };

  // State for image handling
  const [imgSrc, setImgSrc] = useState(getBannerSrc());
  const [imageLoaded, setImageLoaded] = useState(false);
  const errorCountRef = useRef(0);
  const maxRetries = 2;

  // Handle image error
  const handleImageError = () => {
    errorCountRef.current += 1;

    if (errorCountRef.current <= maxRetries) {
      // Use fallback image
      setImgSrc("/courses-banner.png");
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleEnroll = (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Stop event bubbling

    if (!course._id) {
      toast.error("Course not found");
      return;
    }

    try {
      setLoading(true);

      // Store course data in localStorage for checkout page
      localStorage.setItem(
        "checkoutCourse",
        JSON.stringify({
          id: course._id,
          title: course.title,
          price: course.price,
          instructor: course.instructor,
          bannerUrl: getBannerSrc(), // Use the processed banner
          category: categoryName,
        }),
      );

      // Redirect to checkout page
      router.push(`/checkout?course=${course._id}`);
    } catch (error) {
      console.error("Error preparing checkout:", error);
      toast.error("Failed to proceed to checkout");
    } finally {
      setLoading(false);
    }
  };

  // Determine what to show based on state
  const renderImageContent = () => {
    if (!imgSrc) {
      return (
        <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gray-200">
          <span className="text-gray-500">No image available</span>
        </div>
      );
    }

    return (
      <>
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-200">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
          </div>
        )}

        {/* Main image */}
        <img
          src={imgSrc}
          alt={course.title}
          className={`h-full w-full rounded-lg object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      </>
    );
  };

  return (
    <Card className="mx-auto w-full max-w-sm gap-y-5 overflow-hidden rounded-xl border border-border bg-transparent p-4 shadow-none">
      <Link href={`/courses/${course._id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          {renderImageContent()}
        </div>
      </Link>

      <CardContent className="p-0">
        <Link href={`/courses/${course._id}`} className="block">
          <div className="flex items-center justify-between pt-1 pb-3">
            <Badge className="rounded border-none bg-[#103ABA]/10 px-2 py-1 text-[16px] font-normal text-title-one hover:text-white">
              {categoryName}
            </Badge>
            <span className="text-sm text-[#A9A9A9]">
              {course.enrolledStudents || 0} enrolled
            </span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {course.title}
          </h3>

          <hr className="border-border" />

          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 rounded-full bg-base object-cover">
                <AvatarImage
                  src={course.instructor?.photo || "/mentor-1.png"}
                  alt={course.instructor?.name}
                  className="object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <AvatarFallback>
                  {course.instructor?.name?.charAt(0) || "I"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-[#A9A9A9]">
                {course.instructor?.name || "Instructor"}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-sm font-normal text-foreground">
                {course.rating?.toFixed(1) || "4.9"}
              </span>
              <Star className="size-4 text-yellow-400" />
            </div>
          </div>
        </Link>
        <hr className="border-border" />

        <div className="mt-5 flex items-center justify-between rounded-md bg-title-light p-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">
              {formatPrice(course.price)}
            </span>
            <span className="text-xs text-[#A8A8A8] line-through">
              {formatPrice(originalPrice)}
            </span>
            {course.discountPercentage && (
              <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                {course.discountPercentage}% off
              </span>
            )}
          </div>

          <button
            onClick={handleEnroll}
            disabled={loading}
            className="font-medium cursor-pointer text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                Processing...
              </span>
            ) : (
              "Enroll Now"
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;