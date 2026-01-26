import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

export default function TestimonialCard({ items }) {
  return (
    <Card className="border-0 py-8 shadow-none">
      <CardContent className="px-5">
        <p className="text-center text-body font-light text-gray italic">
          {items.content}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-center gap-x-2">
        <Image
          src={items?.avatar || "https://tailwindcss.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbook-promo.3012c0f6.png&w=128&q=75"}
          alt="user image"
          width={40}
          height={40}
          className="size-10 rounded-full"
        />
        <div>
          <div>
            <p className="text-body text-text-dark">{items.name}</p>
          </div>
          <div>
            <small className="text-body text-sm text-text-dark">{items.role}</small>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}