import Image from "next/image";
import Content from "./content";

export default function Hero({ mentorData }) {

  // Extract the banner image from mentorData
  const bannerImage = mentorData?.banner_image;

  return (
    <section className="body-font relative isolate flex h-[24rem] items-center justify-between overflow-hidden bg-title-two bg-scroll bg-repeat-x px-[calc((100dvw-1200px)_/_2)] text-gray-600 after:absolute after:inset-0 after:-z-[1] after:bg-[url('/hero-mesh.png')] after:opacity-15 after:content-['']">
      <Content mentorData={mentorData} />

      {/* Conditionally render either the fetched banner image or the default image */}
      {bannerImage ? (
        // If we have a banner image from the API
        <div className="relative hidden h-[306px] w-[362px] md:block">
          <img
            src={bannerImage}
            alt="hero image"
            width={362}
            height={306}
            className="h-full w-full object-contain"
            // Note: Using regular img tag for base64 images
            // Next.js Image component doesn't support base64 images without configuration
          />
        </div>
      ) : (
        // Fallback to default image if no banner image
        <Image
          src="/mentor-room-hero.png"
          alt="hero image"
          width={362}
          height={306}
          className="hidden md:block"
        />
      )}
    </section>
  );
}
