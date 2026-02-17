import Slider from "./slider";

export default function CategorySlider({ mentorData }) {
  const SectionTwoData = mentorData?.section_two;
  
  // Safely access icons with optional chaining and provide fallback
  const icons = SectionTwoData?.icons || [];
  
  return (
    <section className="full-bleed-padding mt-[6.25rem] bg-[#F4F7FD] p-[43px_73px]">
      <header className="text-center">
        <h2 className="text-3xl font-medium md:text-[2.5rem]">
          {SectionTwoData?.box_title || "Default Title"}
        </h2>
        <p className="mx-auto mt-3 w-[80%] text-[#898787] md:mt-0 md:w-full md:text-2xl">
          {SectionTwoData?.box_sub_title || "Default Subtitle"}
        </p>
      </header>

      {icons.length > 0 ? (
        <Slider SectionTwoDataIcons={icons} />
      ) : (
        <p className="text-center text-gray-500 mt-8">No items to display</p>
      )}
    </section>
  );
}