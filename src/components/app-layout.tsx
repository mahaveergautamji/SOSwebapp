import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/sidebar";
import { AppFooter } from "./app-footer";

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                    <AppHeader />
                    <main className="flex-1 p-4 sm:p-6 md:p-8">
                      <SidebarInset>
                        {children}
                      </SidebarInset>
                    </main>
                    <AppFooter/>
                </div>
            </div>
        </SidebarProvider>
    );
}
