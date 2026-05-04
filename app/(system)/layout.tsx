import { ThemeSwitcher } from "@/components/system/theme-switcher";
import { AppSidebar } from "@/components/system/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DynamicBreadcrumb } from "@/components/ui/dynamic-breadcrumb";
import { Suspense } from "react";
import { BreadcrumbSkeleton } from "@/components/skeleton/breadcrumb-skeleton";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex px-4 h-12 border-b border-border w-full shrink-0 items-center justify-between  gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className=" flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-3" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Suspense fallback={<BreadcrumbSkeleton />}>
              <DynamicBreadcrumb />
            </Suspense>
          </div>
          <ThemeSwitcher />
        </header>
        <main className="px-4 pt-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
