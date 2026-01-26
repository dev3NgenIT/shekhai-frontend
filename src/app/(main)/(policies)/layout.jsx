import Sidebar from "@/components/policies/Sidebar";
import Topbar from "@/components/policies/Topbar";

export default function PoliciesLayout({ children }) {
  return (
    <div className="page-body container-width flex flex-col bg-[#F6F6F6] md:flex-row">
      <Topbar />
      <Sidebar />

      <main className="px-5 py-16 md:p-[53px_58px]">{children}</main>
    </div>
  );
}
