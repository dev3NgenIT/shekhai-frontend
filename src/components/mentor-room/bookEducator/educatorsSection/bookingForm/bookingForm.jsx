import Form from "./form/form";
import Header from "./header";

export default function BookingForm() {
  return (
    <section className="col-span-12 grid place-content-center rounded-lg border border-[#D4E2FF] px-5 py-6 shadow md:col-span-4 md:px-7 md:py-0">
      <Header />

      <Form />
    </section>
  );
}
