import ProfileNavbar from "@/components/profile/ProfileNavbar";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-155px)] w-full">
        <ProfileSidebar />
        <main className="flex-1 px-5">
          <ProfileNavbar />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
