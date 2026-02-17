import Image from "next/image";
import Content from "./content";

export default function SkillCTAOne({ data }) {
  // Extract the original image path from the Next.js optimized URL
  const getOriginalImagePath = (imageUrl) => {
    if (!imageUrl) return "/default-skill-image.jpg"; // Add a default fallback

    try {
      // If it's a Next.js optimized URL, extract the original path
      if (imageUrl.includes('/_next/image')) {
        const urlParams = new URL(imageUrl).searchParams;
        const originalUrl = urlParams.get('url');
        return originalUrl || "/default-skill-image.jpg";
      }
      return imageUrl;
    } catch (error) {
      console.error("Error parsing image URL:", error);
      return "/default-skill-image.jpg";
    }
  };

  const imageSrc = getOriginalImagePath(data?.image);

  return (
    <section className="mt-16 flex items-center justify-center bg-[#ECF4FA] py-5 md:mt-[6.25rem] md:justify-between md:py-0">
      <Image
        src={imageSrc}
        alt="skill image"
        width={480}
        height={340}
        className="hidden md:block md:h-[340px] md:w-[480px] object-cover"
        priority={true} // Add priority for above-the-fold images
      />

      <Content data={data} />

      <Image
        src={imageSrc}
        alt="skill image"
        width={480}
        height={340}
        className="hidden md:block md:h-[340px] md:w-[480px] object-cover"
        priority={true} // Add priority for above-the-fold images
      />
    </section>
  );
}