import ContactForm from "./contactForm";
import InformationCard from "./informationCard";

export default function FormSection() {
  return (
    <section className="container-width mt-5 flex flex-col items-center justify-between gap-x-12 rounded-[0.625rem] bg-white p-3 md:mt-[6.25rem] md:flex-row md:border md:shadow">
      <InformationCard />
      <ContactForm />
    </section>
  );
}
