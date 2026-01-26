import Link from "next/link";

export default function Links({
  title = "pages",
  links = [
    { title: "benefits", href: "/" },
    { title: "our courses", href: "/" },
    { title: "testimonials", href: "/" },
    { title: "FAQ", href: "/" },
  ],
}) {
  return (
    <div className=" mt-3 flex flex-col space-y-1.5">
      <h3 className="mb-2.5 font-hanken_grotesk text-lg font-semibold capitalize">
        {title}
      </h3>

      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="text-[#59595A] capitalize"
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
