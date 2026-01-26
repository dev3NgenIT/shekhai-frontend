import ProjectCard from "@/components/shared/projectCard/ProjectCard";
import { Button } from "@/components/ui/button";
import { MdArrowOutward } from "react-icons/md";
import Tags from "./Tags";
import Link from "next/link";

export default function ProjectsSection() {
  return (
    <section className="mt-[6.25rem] bg-[#F4FAFF]">
      <div className="container-width py-8 md:py-[4.25rem]">
        <Tags />

        <div className="mx:px-0 mt-8 grid grid-cols-1 gap-x-6 gap-y-4 px-3 md:mt-[4.75rem] md:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCard key={index} />
          ))}
        </div>

        <Link href={"/courses"}>
          <Button
            variant="outline"
            className="group mx-auto mt-[5.5rem] flex bg-transparent px-8 py-5 text-black"
          >
            Explore Other Projects{" "}
            <MdArrowOutward className="text-xl font-semibold text-base group-hover:text-white" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
