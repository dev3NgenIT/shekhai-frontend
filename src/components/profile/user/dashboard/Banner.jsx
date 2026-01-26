import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function DashboardBanner() {
  return (
    <Card className="relative border-0 bg-gradient-to-r from-base to-base/80 text-white">
      <CardContent className="overflow-hidden py-6">
        <div className="relative z-10">
          <Badge
            variant="secondary"
            className="mb-3 border-white/30 bg-white/20 text-white"
          >
            WEBINAR
          </Badge>
          <h2 className="mb-2 text-2xl font-semibold">
            Join our mentor for an exclusive webinar
            <br />
            and elevate your learning journey!
          </h2>
          <Button className="mt-4 rounded-full bg-black p-5 font-semibold text-white hover:bg-black">
            Register Now
            <div className="ml-2 flex size-5 items-center justify-center rounded-full bg-white text-xs text-black">
              <ArrowRight />
            </div>
          </Button>
        </div>
        <Image
          src="/star-mesh.png"
          alt=""
          width={350}
          height={350}
          className="absolute top-0 right-0"
        />
      </CardContent>
    </Card>
  );
}
