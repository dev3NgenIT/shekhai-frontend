import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCTA() {
  return (
    <section className="mt-16 bg-[#ECF4FA] md:my-[6.25rem]">
      <div className="container-width flex items-center justify-between p-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold">
            Start Your Software <br />
            Project Today!
          </h1>
          <p className="max-w-[522px] text-lg text-[#898787]">
            Master robotics, home automation, and more with expert-guided
            tools—perfect for learners and creators ready to share or sell.
          </p>

          <Link href={"/courses/smart-home-automation"}>
            <Button variant={"outline"} className={"mt-4 bg-transparent"}>
              Start Learning
            </Button>
          </Link>
        </div>

        <Image
          src="/project-thumbnail-2.png"
          alt="project image"
          width={720}
          height={320}
          className="hidden object-cover md:block"
        />
      </div>
    </section>
  );
}
