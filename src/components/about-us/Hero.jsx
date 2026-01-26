import { Badge } from "../ui/badge";

export default function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-[558px] py-8 text-center md:py-16">
        <Badge className="border-[#3C9D77] bg-transparent px-8 py-3 text-[16px] text-[#3C9D77]">
          About Us
        </Badge>

        <h1 className="mt-5 px-5 text-3xl md:px-0 md:text-[52px]">
          Built for learners. Powered by progress.
        </h1>
      </div>
    </section>
  );
}
