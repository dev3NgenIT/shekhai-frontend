import Image from "next/image";

export default function Educator({ instructor }) {
  // You might want to add a default image if instructor image is not available
  const instructorImage = instructor.image || "/instructor-carousel-image.png";

  // You might need to extract expertise from instructor data
  // This is just an example - adjust based on your actual data structure
  const expertise = instructor.expertise || "Instructor";

  return (
    <div className="relative flex h-[11.75rem] w-96 items-center justify-between overflow-hidden rounded-lg bg-text-light">
      <div className="px-5">
        <h3 className="text-lg text-title-one">{instructor.name}</h3>
        <p className="text-gray">{expertise}</p>
        {/* Optional: Display email or other info */}
        {/* <p className="text-xs text-gray-500">{instructor.email}</p> */}
      </div>

      <Image
        src={instructorImage}
        alt={`${instructor.name} - instructor`}
        width={384}
        height={188}
        className="absolute top-0 right-0"
      />
    </div>
  );
}