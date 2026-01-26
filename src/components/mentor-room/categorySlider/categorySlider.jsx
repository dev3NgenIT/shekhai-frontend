import Slider from "./slider";

export default function CategorySlider({mentorData}) {
  const SectionTwoData = mentorData?.section_two;
  return (
    <section className="full-bleed-padding mt-[6.25rem] bg-[#F4F7FD] p-[43px_73px]">
      <header className="text-center">
          <h2 className="text-3xl font-medium md:text-[2.5rem]">
          {SectionTwoData?.box_title }
        </h2>
        <p className="mx-auto mt-3 w-[80%] text-[#898787] md:mt-0 md:w-full md:text-2xl">
          {SectionTwoData?.box_sub_title }
        </p>
      </header>

      <Slider SectionTwoDataIcons={SectionTwoData.icons}/>
    </section>
  );
}
