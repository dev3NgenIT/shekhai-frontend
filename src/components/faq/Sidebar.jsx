import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="mx-8 my-[35px] md:w-[20rem]">
      <h3 className="text-2xl font-medium">Quick Links</h3>

      <Link href="/community" className="">
        <div className="mt-[1.125rem] rounded-2xl bg-[#EDEDED] px-6 py-3">
          <p className="text-black">Join the community</p>
          <p className="text-sm text-[#898787]">
            Connect, learn, and grow with like-minded learners and mentors.
          </p>
        </div>
      </Link>
      <Link href="/community" className="">
        <div className="mt-[1.125rem] rounded-2xl bg-[#EDEDED] px-6 py-3">
          <p className="text-black">Join the community</p>
          <p className="text-sm text-[#898787]">
            Connect, learn, and grow with like-minded learners and mentors.
          </p>
        </div>
      </Link>
      <Link href="/community" className="">
        <div className="mt-[1.125rem] rounded-2xl bg-[#EDEDED] px-6 py-3">
          <p className="text-black">Join the community</p>
          <p className="text-sm text-[#898787]">
            Connect, learn, and grow with like-minded learners and mentors.
          </p>
        </div>
      </Link>
    </aside>
  );
}
