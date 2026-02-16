"use client";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function CategoryCard({ data: product }) {
  // If no product data, return skeleton or placeholder
  if (!product) {
    return (
      <div className="animate-pulse flex items-center justify-between rounded-[.5rem] border border-[rgba(60,_157,_119,_0.20)] bg-white px-3 py-4 md:h-[213px] md:w-[17.625rem] md:px-[1.5rem_2rem] md:py-8">
        <div>
          <div className="relative">
            <div className="size-10 rounded-lg bg-gray-200 md:size-[56px]"></div>
          </div>
          <div className="mt-3 h-5 w-24 rounded bg-gray-200 md:mt-4 md:h-6"></div>
          <div className="mt-1 h-4 w-16 rounded bg-gray-200 md:mt-2"></div>
        </div>
        <div className="size-10 rounded-full bg-gray-200 md:size-10"></div>
      </div>
    );
  }

  // Extract product/category data
  const name = product?.name || product?.title || "Communication";
  const courseCount = product?.courses_count || product?.courses || product?.total_courses || 0;

  // Get image - but validate it's actually an image URL
  const rawImage = product?.image || product?.icon || product?.thumbnail;

  // Check if it's a valid image URL (ends with image extension or starts with http and contains image indicators)
  const isValidImageUrl = rawImage &&
    typeof rawImage === 'string' &&
    (rawImage.match(/\.(jpeg|jpg|gif|png|svg|webp|ico)$/i) ||
      rawImage.includes('/images/') ||
      rawImage.includes('/uploads/'));

  // If it's not a valid image URL, use the fallback
  const imageSrc = isValidImageUrl ? rawImage : "/category-logo.png";

  const backgroundColor = product?.color || "#E7F0F6";
  const url = product?.url || product?.slug || `/courses`;

  return (
    <Link
      href={url}
      className="group flex items-center justify-between rounded-[.5rem] border border-[rgba(60,_157,_119,_0.20)] bg-white px-3 py-4 transition-all duration-300 hover:border-blue-300 hover:shadow-lg md:h-[213px] md:w-[17.625rem] md:px-[1.5rem_2rem] md:py-8"
      style={{
        boxShadow: "0px 0px 45px 0px rgba(16, 58, 186, 0.08)",
        transition: "all 0.3s ease"
      }}
    >
      <div>
        <div className="relative">
          {/* Product/Category Image - FIXED VERSION */}
          <Image
            src={imageSrc}
            alt={name}
            width={56}
            height={56}
            className="relative isolate size-10 object-contain md:size-[56px]"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = "/category-logo.png";
            }}
          />
          {/* Background circle */}
          <span
            className="absolute top-0 left-4 -z-1 block size-10 rounded-full md:left-[25px] md:size-[56px] transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor }}
          />
        </div>

        {/* Category/Product Name */}
        <h3 className="mt-3 text-lg font-medium text-gray-900 md:mt-4 md:text-xl">
          {name}
        </h3>
      </div>

      {/* Arrow Icon */}
      <MdArrowOutward className="size-10 self-end text-text-light transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-600" />
    </Link>
  );
}