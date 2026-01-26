import { BsChatRightText } from "react-icons/bs";
import { IoVideocamSharp } from "react-icons/io5";
import { MdHeadsetMic } from "react-icons/md";

export default function MeetingMedium() {
  return (
    <section className="flex items-center justify-between px-7">
      {/* Video Call */}
      <div className="flex w-fit flex-col items-center gap-x-3 gap-y-1 font-medium text-base">
        <span className="inline-block w-fit rounded-full rounded-tr-[3rem] border-3 border-base p-2">
          <IoVideocamSharp className="text-base" />
        </span>
        Video Call
      </div>

      {/* Text Message */}
      <div className="mt-0.5 flex flex-col items-center gap-y-2">
        <BsChatRightText className="text-3xl" />
        <span className="font-medium">Chat</span>
      </div>

      {/* Text Message */}
      <div className="flex flex-col items-center gap-y-2">
        <MdHeadsetMic className="text-3xl" />
        <span className="font-medium">Voice Call</span>
      </div>
    </section>
  );
}
