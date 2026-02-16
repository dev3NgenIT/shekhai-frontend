import Image from "next/image";
import Content from "./content";

export default function SkillCTATwo({ data }) {

  // Extract the original image path from the Next.js optimized URL
  const getOriginalImagePath = (imageUrl) => {
    if (!imageUrl) return "/stitching.webp";

    try {
      // If it's a Next.js optimized URL, extract the original path
      if (imageUrl.includes('/_next/image')) {
        const urlParams = new URL(imageUrl).searchParams;
        const originalUrl = urlParams.get('url');
        return originalUrl || "/stitching.webp";
      }
      return imageUrl;
    } catch {
      return "/stitching.webp";
    }
  };

  const imageSrc = getOriginalImagePath(data?.image);

  return (
    <section className="mt-16 flex items-center justify-center bg-[#ECF4FA] md:mt-[6.25rem] md:justify-between">
      <Content data={data} />

      <Image
        src={imageSrc}
        alt="skill image"
        width={720}
        height={340}
        className="hidden md:block"
      />
    </section>
  );
}