import Image from "next/image";
import LeftContent from "./leftContent";
import RightContent from "./rightContent";

export default function MentorCTA({ data }) {
  
  // Extract the original image path from the Next.js optimized URL
  const getOriginalImagePath = (imageUrl) => {
    if (!imageUrl) return "/mentor-1.png"; // Default fallback
    
    try {
      // If it's a Next.js optimized URL, extract the original path
      if (imageUrl.includes('/_next/image')) {
        const urlParams = new URL(imageUrl).searchParams;
        const originalUrl = urlParams.get('url');
        return originalUrl || "/mentor-1.png";
      }
      return imageUrl;
    } catch (error) {
      console.error("Error parsing image URL:", error);
      return "/mentor-1.png";
    }
  };

  const imageSrc = getOriginalImagePath(data?.background_image);

  return (
    <section className="mt-16 flex md:h-[22.125rem] flex-col py-7 md:py-0 items-end justify-between bg-title-one px-[calc((100dvw-1200px)/2)] md:mt-[11.375rem] md:flex-row">
      <LeftContent data={data} />

      <Image
        src={imageSrc}
        alt="mentor image"
        width={337}
        height={437}
        className="hidden aspect-[337/437] md:block"
      />

      <RightContent data={data} />
    </section>
  );
}