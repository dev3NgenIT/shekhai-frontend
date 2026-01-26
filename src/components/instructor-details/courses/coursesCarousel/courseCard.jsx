import Stars from "@/components/shared/stars/stars";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import SideCardImg from "../../../../assets/side-card-img.png";

export default function CourseCard() {
  return (
    <Card className="h-[425px] w-[294px] justify-between gap-0 p-2 shadow-none">
      <CardHeader className="block h-fit p-0">
        <Image
          src={SideCardImg}
          alt="course title"
          width={278}
          height={200}
          className="h-[200px] w-[278px] rounded-[0.625rem]"
        />
      </CardHeader>

      <CardContent className="-mt-9 p-0">
        <p className="line-clamp-2 text-body text-black">
          Digital Marketing Mastery From Basics to Pro Strategy
        </p>

        <div className="mt-[1.625rem] flex items-center justify-between">
          <div className="flex items-center gap-x-1.5">
            <Image
              src="/educator.png"
              width={30}
              height={30}
              alt="instructor"
              className="size-[1.875rem] rounded-full object-cover"
            />
            <span className="text-[#938F8F]">Wade Warren</span>
          </div>

          <div className="flex items-center gap-x-1">
            <span className="text-sm">4.9</span>
            <Stars count={4.9} />
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-0">
        <Link href={"/checkout"} className="w-full">
          <Button className="w-full justify-between">
            <span>BDT 3350</span> <span>Enroll Now</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
