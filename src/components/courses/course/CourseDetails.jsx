"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import StarRating from "@/components/Shared/StarRating/StarRating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Clock,
  Users,
  BookOpen,
  Calendar,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

export default function CourseDetails() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Get course ID from params
  const courseId = params?.slug || params?.id;

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        toast.error("Course ID not found");
        router.push("/courses");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://shekhai-server.onrender.com/api/v1/courses/${courseId}`,
        );

        if (response.data.success) {
          const courseData = response.data.course || response.data.data;
          setCourse(courseData);

          // Check if course is published
          if (!courseData.published) {
            toast.error("This course is not published yet.");
          }
        } else {
          toast.error("Failed to fetch course data");
          router.push("/courses");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Error loading course details");
        router.push("/courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router]);

  // Helper function to extract image source from various formats
  const getImageSrc = (image) => {
    if (!image) return null;
    
    // If it's an object with data property (base64)
    if (typeof image === 'object' && image.data) {
      return image.data;
    }
    
    // If it's a direct URL string
    if (typeof image === 'string') {
      return image;
    }
    
    return null;
  };

  // Helper function to format price
  const formatPrice = (price) => {
    if (!price && price !== 0) return "Free";
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate discount percentage
  const calculateDiscount = (originalPrice, discountedPrice) => {
    if (!originalPrice || originalPrice <= discountedPrice) return 0;
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  // Get all images for the slider (banner + thumbnails)
  const getAllImages = () => {
    const images = [];
    
    // Add banner image first if exists
    if (course?.bannerImage) {
      const bannerSrc = getImageSrc(course.bannerImage);
      if (bannerSrc) {
        images.push(bannerSrc);
      }
    }
    
    // Add thumbnails
    if (course?.thumbnails && course.thumbnails.length > 0) {
      course.thumbnails.forEach(thumbnail => {
        const thumbnailSrc = getImageSrc(thumbnail);
        if (thumbnailSrc && !images.includes(thumbnailSrc)) {
          images.push(thumbnailSrc);
        }
      });
    }
    
    return images;
  };

  // Handle next image
  const nextImage = () => {
    const images = getAllImages();
    if (images.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  // Handle previous image
  const prevImage = () => {
    const images = getAllImages();
    if (images.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6 lg:col-span-2">
        <Card className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading course details...</p>
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (!course) {
    return (
      <div className="space-y-6 lg:col-span-2">
        <Card className="flex h-64 items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <p className="mt-4 text-gray-600">Course not found</p>
            <Button onClick={() => router.push("/courses")} className="mt-4">
              Browse Courses
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const images = getAllImages();
  const hasImages = images.length > 0;
  const originalPrice = course.price * 1.2; // Assuming 20% discount if you want to show
  const discountPercentage = calculateDiscount(originalPrice, course.price);

  console.log("Course images:", images);
  console.log("Raw course data:", course);

  return (
    <div className="space-y-6 lg:col-span-2">
      <Toaster position="top-right" />

      {/* Banner Image Slider Section */}
      {hasImages ? (
        <Card className="m-0 gap-0 border-0 bg-transparent p-0 shadow-none">
          <div className="relative aspect-video bg-black">
            {/* Main Image Display */}
            <img
              src={images[activeImageIndex]}
              alt={`Course image ${activeImageIndex + 1}`}
              className="h-full w-full object-contain"
              onError={(e) => {
                console.error("Image failed to load:", images[activeImageIndex]);
                e.target.src = "/placeholder-image.png"; // Add a placeholder image
              }}
            />
            
            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            
            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                {activeImageIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnails Carousel */}
          {images.length > 1 && (
            <div className="p-4">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {images.map((src, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/4 pl-2 md:pl-4"
                    >
                      <div
                        className={`relative aspect-video cursor-pointer overflow-hidden rounded border-2 transition-all md:rounded-lg ${
                          activeImageIndex === index
                            ? "border-blue-500 scale-95"
                            : "border-transparent hover:border-blue-500 hover:scale-[0.98]"
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img
                          src={src}
                          alt={`Thumbnail ${index + 1}`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder-thumbnail.png";
                          }}
                        />
                        {activeImageIndex === index && (
                          <div className="absolute inset-0 bg-blue-500/20"></div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
        </Card>
      ) : (
        <Card className="m-0 gap-0 border-0 bg-transparent p-0 shadow-none">
          <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No images available</p>
          </div>
        </Card>
      )}

      {/* Course Details */}
      <Card className="rounded-none border-0 bg-transparent pb-16 shadow-none">
        <div className="space-y-4">
          <div>
            <h1 className="mb-2 text-4xl font-medium text-gray-900">
              {course.title || "Untitled Course"}
            </h1>

            {/* Course Meta Info */}
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {course.level && (
                <span className="rounded-full bg-gray-100 px-3 py-1">
                  {course.level}
                </span>
              )}

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.totalDuration || 0} mins</span>
              </div>

              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>
                  {course.totalModules || course.modules?.length || 0} modules
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.enrolledStudents || 0} enrolled</span>
              </div>

              {course.enrollmentDeadline && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Enroll by:{" "}
                    {new Date(course.enrollmentDeadline).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="mb-4 flex items-center gap-4">
              <StarRating rating={course.rating || 4.9} />
              <span className="text-sm font-medium">{course.rating || 4.9}</span>
            </div>

            {/* Price */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl font-bold text-base">
                {formatPrice(course.price)}
              </span>
              {discountPercentage > 0 && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="leading-relaxed text-gray-500">
              {course.shortDescription ||
                course.longDescription ||
                "No description available."}
            </p>

            {/* Long Description (if available) */}
            {course.longDescription &&
              course.longDescription !== course.shortDescription && (
                <div className="mt-4">
                  <h3 className="mb-2 text-lg font-semibold">
                    Course Description
                  </h3>
                  <p className="leading-relaxed text-gray-500">
                    {course.longDescription}
                  </p>
                </div>
              )}

            {/* Category */}
            {course.category && course.category.length > 0 && (
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {course.category.map((cat, index) => (
                    <span
                      key={cat._id || index}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* What You'll Learn */}
            {course.whatYoullLearn && course.whatYoullLearn.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold">What You'll Learn</h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {course.whatYoullLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-base"></div>
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {course.prerequisites && course.prerequisites.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold">Requirements</h3>
                <div className="space-y-2">
                  {course.prerequisites.map((req, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-gray-400"></div>
                      <span className="text-gray-600">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modules Preview */}
            {course.modules && course.modules.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Course Modules ({course.modules.length})
                </h3>
                <div className="space-y-3">
                  {course.modules.slice(0, 3).map((module, index) => (
                    <div
                      key={module._id || index}
                      className="rounded-lg border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            Module {index + 1}: {module.title}
                          </h4>
                          {module.description && (
                            <p className="mt-1 text-sm text-gray-500">
                              {module.description}
                            </p>
                          )}
                        </div>
                        {module.duration && (
                          <span className="text-sm text-gray-500">
                            {module.duration} mins
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {course.modules.length > 3 && (
                    <p className="text-center text-gray-500">
                      + {course.modules.length - 3} more modules
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}