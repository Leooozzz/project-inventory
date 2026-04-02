import AppSidebar from "@/components/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { requiredUserLogged } from "@/cookies/authValidate";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requiredUserLogged();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex min-h-svh flex-col">
        <header className="w-full px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-white md:hidden" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-0 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
