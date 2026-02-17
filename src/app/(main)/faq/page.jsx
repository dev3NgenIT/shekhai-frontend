import Content from "@/components/faq/Content";
import Sidebar from "@/components/faq/Sidebar";

export default function Page() {
  return (
    <section className="container-width mt-8 md:mt-[4.25rem]">
      <div className="px-5 md:px-0">
        <h2 className="text-4xl text-[#000000]">Frequently Asked Questions</h2>
        <p className="mt-2 text-[16px] text-[#898787]">
          Last Updated: May 25, 2025
        </p>
      </div>

      <section className="mt-16 flex flex-col items-start justify-between bg-[#F6F6F6] md:flex-row">
        <Content />
        <Sidebar />
      </section>
    </section>
  );
}
