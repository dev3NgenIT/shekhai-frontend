import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function InstructorDetails({ instructor }) {
  return (
    <section className="full-bleed-padding flex flex-col-reverse items-center justify-between bg-title-one px-4 py-6 md:h-[31.25rem] md:flex-row md:px-0 md:py-0">
      <div className="mt-6 w-full px-4 text-white md:mt-0 md:px-0">
        <Badge className="rounded-sm border-0 bg-stroke p-2 text-button">
          Meet Your Mentor
        </Badge>

        <h1 className="mt-4 text-5xl">{instructor.name}</h1>
        <h3 className="mt-4 text-2xl">
          <div className="flex flex-wrap gap-2">
            {instructor.expertise && instructor.expertise.length > 0 ? (
              instructor.expertise.map((expertise, index) => (
                <Badge
                  key={`${expertise}-${index}`} // More unique key
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {expertise}
                </Badge>
              ))
            ) : (
              <Badge className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                No expertise listed
              </Badge>
            )}
          </div>
        </h3>

        <hr className="mt-[1.625rem] mb-6 w-[12.875rem] bg-white md:w-[27.25rem]" />

        <p className="max-w-[39rem]">
          {instructor.bio || "No bio available for this instructor."}
        </p>
      </div>

      <Image
        src={instructor?.avatarUrl || "/default-profile-image.png"}
        alt="mentor image"
        width={370}
        height={395}
        className="h-[395px] w-[370px] object-cover md:rounded-md"
      />
    </section>
  );
}
