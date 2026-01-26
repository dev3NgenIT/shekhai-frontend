import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export default function CategoryScrollArea() {
  return (
    <ScrollArea className="h-[45rem] w-full shrink-0 md:w-[32.75rem]">
      <div className="md:pr-8">
        {tags.map((tag) => (
          <Card
            key={tag}
            className="mb-4 flex-row items-center justify-between px-6 py-8"
          >
            {/* <CardContent> */}
            <Image
              src="/instructor-icon.svg"
              alt="category icon"
              width={68}
              height={68}
            />
            <div>
              <h3 className="mb-2 text-card-title text-base">UI/UX Design</h3>
              <p className="line-clamp-3 text-sm text-[#898787]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur vitae in iusto, similique nam provident! Sunt
                eligendi sint, ducimus quibusdam cum distinctio ad corporis,
                eaque, quaerat ipsam et aut cupiditate?
              </p>
            </div>

            <Badge
              className={
                "rounded border-none bg-stroke text-xl !text-base hover:bg-stroke"
              }
            >
              10
            </Badge>
            {/* </CardContent> */}
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
