import bannerImg from "@/assets/community-banner.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Banner() {
  return (
    <div
      className="flex h-[400px] w-full flex-col items-center justify-center bg-cover bg-center text-white md:h-[450px]"
      style={{
        backgroundImage: `url(${bannerImg.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderImage: "fill 0 linear-gradient(#000000cc,#000000cc)",
      }}
    >
      <Badge className="tex w-fit rounded-full border border-white bg-transparent px-3 py-2 font-semibold hover:bg-transparent">
        Ask. Share. Inspire.
      </Badge>

      <h1 className="mt-3 text-center text-2xl font-semibold md:text-hero-headline">
        Got Questions? <br /> Let’s Solve Them Together
      </h1>

      <div className="relative mx-auto mt-11 flex h-12 w-[20rem] justify-center rounded-full bg-white md:h-14 md:w-[32.125rem]">
        <Input
          className="absolute top-0 left-0 z-1 h-12 w-[20rem] rounded-full pr-[5.1rem] pl-3 text-text-dark md:h-14 md:w-[32.125rem] md:pr-[10rem] md:pl-[37px]"
          placeholder="What are you looking for?"
        />
        <Button className="absolute top-0 right-0 z-2 h-12 w-[5rem] cursor-pointer rounded-r-full bg-base text-white hover:bg-base/90 md:h-14 md:w-[9.625rem]">
          Search <span className="hidden md:inline">Now</span>
        </Button>
      </div>
    </div>
  );
}
