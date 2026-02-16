import InstructorDetails from "./instructorDetails";
import Qualities from "./qualities";

export default function Banner({instructor}) {
  return (
    <header>
      <InstructorDetails instructor={instructor} />

      <Qualities />
    </header>
  );
}
