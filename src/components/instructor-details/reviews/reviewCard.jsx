import Stars from "@/components/shared/Stars/Stars";
import { BsThreeDots } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function ReviewCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border p-5">
      <div className="flex flex-col gap-x-3.5">
        <div className="flex items-center justify-between text-gray">
          <Stars count={3.8} />
          <BsThreeDots className="text-2xl" />
        </div>

        <div className="mt-2.5">
          <h4 className="flex items-center gap-x-1.5 text-xl font-medium">
            Olivia P.{" "}
            <IoIosCheckmarkCircle className="text-2xl text-green-500" />
          </h4>

          <p className="small-description mt-2.5 line-clamp-4 text-[#00000099]">
            "As a UI/UX enthusiast, I value simplicity and functionality. This
            t-shirt not only represents those principles but also feels great to
            wear. It's evident that the designer poured their creativity into
            making this t-shirt stand out."
          </p>
        </div>
      </div>

      <p className="text-[#00000099]">Posted on August 17, 2023</p>
    </div>
  );
}
