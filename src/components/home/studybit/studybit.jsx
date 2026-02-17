"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import Content from "./content";
import { useState } from "react";

export default function Studybit({ data }) {
  const [mainImgError, setMainImgError] = useState(false);
  const [starImgError, setStarImgError] = useState(false);
  
  const getOriginalImagePath = (imageUrl, fallback) => {
    if (!imageUrl) return fallback;
    
    try {
      if (imageUrl.includes('/_next/image')) {
        const urlParams = new URL(imageUrl).searchParams;
        return urlParams.get('url') || fallback;
      }
      return imageUrl;
    } catch {
      return fallback;
    }
  };

  const mainImageSrc = mainImgError 
    ? "/studybit-default.png" 
    : getOriginalImagePath(data?.image, "/studybit-default.png");
    
  const starImageSrc = starImgError 
    ? "/star-icon-default.png" 
    : getOriginalImagePath(data?.starIcon, "/star-icon.png");

  return (
    <section className="container-width mt-16 flex h-[16rem] items-center justify-between overflow-hidden rounded-lg border-2 border-[#3AAEF6] bg-[#DDF1FF] bg-[url('/round-mesh.png')] px-3 md:mt-[6.25rem] md:h-[17.5rem] md:pl-[4.875rem] md:pr-11">
      <Content data={data} />

      <div className="relative flex h-full items-end justify-end md:w-auto">
        

        {/* Main mentor image */}
        <div className="relative h-full flex items-end">
          <Image
            src={mainImageSrc}
            alt="mentor image"
            width={234}
            height={327}
            className="h-auto max-h-[280px] w-auto object-contain md:max-h-[327px]"
            onError={() => setMainImgError(true)}
            priority={true}
          />
        </div>

        {/* Arrow button */}
        <Button
          variant="outline"
          className="absolute bottom-2 right-0 size-8 rounded-full bg-white/80 p-0 hover:bg-white hover:scale-110 transition-all md:bottom-8 md:right-8 md:size-10"
          asChild
        >
          <Link href= "/courses">
            <IoIosArrowForward className="size-4 md:size-6 text-[#3AAEF6]" />
          </Link>
        </Button>
      </div>
    </section>
  );
}