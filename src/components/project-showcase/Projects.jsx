import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function Projects() {
  return (
    <section className="container-width mt-16 grid grid-cols-1 gap-6 px-4 md:mt-0 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className={"p-3.5 shadow-none"}>
          <Image
            src={"/project-thumbnail-2.png"}
            alt="Project Thumbnail"
            width={356}
            height={230}
            className="h-[230px] w-[356px] rounded-lg object-cover object-center"
          />
          <CardContent className={"p-0"}>
            <h3 className="text-lg font-semibold">Project Title {index + 1}</h3>
            <p className="mt-3 mb-6 text-sm text-[#898787]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum minus
              dolore odit sunt voluptatibus deleniti? Impedit minus molestiae
              culpa. Beatae repellendus nostrum natus modi eveniet, odit est
              ipsa repudiandae nulla animi facere, corrupti qui laudantium
              repellat cupiditate autem atque minima sed illum molestiae, alias
              tempora mollitia deleniti. Ipsa, illum a?
            </p>

            <Link href={"/courses/smart-home-automation"}>
              <Button className={"rounded"}>Start Learning</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
