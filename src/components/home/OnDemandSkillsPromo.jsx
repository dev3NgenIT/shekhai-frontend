import { Button } from "@/components/ui/button";
import Image from "next/image"; // Add this import
import Link from "next/link";

export default function OnDemandSkillsPromo({ data }) {
  // Extract the original image path from the Next.js optimized URL
  const getOriginalImagePath = (imageUrl) => {
    if (!imageUrl) return "/on-demand-skills-promo-image.png";

    try {
      // If it's a Next.js optimized URL, extract the original path
      if (imageUrl.includes('/_next/image')) {
        const urlParams = new URL(imageUrl).searchParams;
        const originalUrl = urlParams.get('url');
        return originalUrl || "/on-demand-skills-promo-image.png";
      }
      return imageUrl;
    } catch (error) {
      console.error("Error parsing image URL:", error);
      return "/on-demand-skills-promo-image.png";
    }
  };

  const imageSrc = getOriginalImagePath(data?.image);

  return (
    <section className="mx-auto mt-16 md:mt-[6.25rem] px-4">
      <h1 className="text-center text-3xl font-semibold text-title-one md:text-hero-headline">
        {data?.title || "On-Demand Skills"}
      </h1>
      <hr className="mx-auto mt-7 mb-6 h-[3px] w-[12.875rem] bg-stroke" />
      <p className="mx-auto w-[20rem] font-bold text-center text-black md:w-[47.375rem] md:text-xl">
        {data?.subtitle || "Learn skills that matter"}
      </p>
      <p className="mx-auto w-[20rem] text-center text-gray md:w-[47.375rem] md:text-xl">
        {data?.description || "Access thousands of courses anytime, anywhere"}
      </p>
      <div className="relative mx-auto mt-10 w-full max-w-[600px] overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={data?.image_alt || "On-Demand Skills Promo"}
          width={600}
          height={600}
          className="w-full h-auto object-cover"
          priority={true}
        />
      </div>
      <div className="mx-auto mt-10 flex items-center justify-center">
        <Button variant="default" className="self-start">
          <Link href={data?.button_link || "/courses"}>
            {data?.button_text || "Start Learning"}
          </Link>
        </Button>
      </div>
    </section>
  );
}