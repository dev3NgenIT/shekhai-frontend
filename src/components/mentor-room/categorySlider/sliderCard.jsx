import Image from "next/image";

export default function SliderCard({ icon }) {
  // Now 'icon' is a single object: {name: "Career Strategy", icon: "career-strategy.svg"}

  return (
    <div className="grid w-full place-items-center rounded-2xl bg-white py-[48px_70px]">
      <Image
        src={`/${icon.icon || "https://cdn.iconscout.com/icon/premium/png-256-thumb/category-icon-svg-download-png-3064287.png"}`} // or just icon.icon if path is correct
        alt={icon.name}
        width={90}
        height={90}
        onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://cdn.iconscout.com/icon/premium/png-256-thumb/category-icon-svg-download-png-3064287.png";
          }}
        className="size-[90px]"
      />
      <p className="mt-8 text-2xl font-medium text-text-dark capitalize">
        {icon.name}
      </p>
    </div>
  );
}
