import Banner from "@/components/profile/user/webinar/Banner";
import UpcomingSessionCard from "@/components/profile/user/webinar/UpcomingSessionCard";

export default function Page() {
  return (
    <div className="mt-5 min-h-screen w-full md:mt-0">
      <Banner />

      <section className="mt-10">
        <h2 className="mb-4 border-b pb-3 text-2xl font-bold text-[#3B5998]">
          Upcoming Sessions
        </h2>

        <section className="grid md:grid-cols-4 gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <UpcomingSessionCard key={index} />
          ))}
        </section>
      </section>
    </div>
  );
}
