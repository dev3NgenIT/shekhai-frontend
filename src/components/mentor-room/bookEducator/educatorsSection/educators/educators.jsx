import Educator from "./educator";

export default function Educators({ instructors }) {
  
  if (!instructors || instructors.length === 0) {
    return (
      <section className="col-span-8 hidden flex-wrap gap-6 md:flex">
        <p className="text-gray-500">No educators found</p>
      </section>
    );
  }

  return (
    <section className="col-span-8 hidden flex-wrap gap-6 md:flex">
      {instructors.map((instructor) => (
        <Educator key={instructor._id} instructor={instructor} />
      ))}
    </section>
  );
}