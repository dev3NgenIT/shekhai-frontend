import Image from "next/image";
import Perk from "./perk";

export default function Perks({ data }) {

  // Check if data is valid
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <section className="mt-[89px] grid grid-cols-1 gap-6 px-5 md:grid-cols-3">
        <p className="col-span-3 text-center text-gray-500">No perks available</p>
      </section>
    );
  }

  return (
    <section className="mt-[89px] grid grid-cols-1 gap-6 px-5 md:grid-cols-3">
      {data.map((item, index) => (
        <Perk
          key={item.id || item._id || index}
          icon={
            <Image
              src={item.icon || "/placeholder-icon.svg"}
              alt={item.title || "perk icon"}
              width={74}
              height={74}
              className="mb-5"
            />
          }
          title={item.title || "Perk Title"}
          description={item.description || "Perk description goes here"}
        />
      ))}
    </section>
  );
}