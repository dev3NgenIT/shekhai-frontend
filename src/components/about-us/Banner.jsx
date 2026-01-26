import TeamCard from "./TeamCard";

export default function Banner() {
  return (
    <div className="grid grid-cols-1 items-start gap-8 px-5 md:px-0 lg:grid-cols-3">
      {/* Card 1 - Left */}
      <div className="lg:mt-0">
        <TeamCard
          number="01"
          title="Built for Growth"
          description="At Shekhai, we help people and businesses grow online with clarity, creativity, and strategic thinking."
          imageUrl="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=600"
          className="max-w-sm"
        />
      </div>

      {/* Card 2 - Middle (positioned lower) */}
      <div className="lg:mt-16">
        <TeamCard
          number="02"
          title="Shaping Digital Futures"
          description="Shekhai empowers individuals to succeed online through smart, results-driven strategies."
          imageUrl="https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=600"
          className="mx-auto max-w-lg"
        />
      </div>

      {/* Card 3 - Right */}
      <div className="lg:mt-0">
        <TeamCard
          number="03"
          title="Digital Growth"
          description="Our team is dedicated to helping individuals and businesses thrive online through smart strategies and innovative thinking."
          imageUrl="https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=600"
          className="ml-auto max-w-sm"
        />
      </div>
    </div>
  );
}
