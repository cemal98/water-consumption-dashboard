import { FC } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../AppSidebar/AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hideSidebar?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, hideSidebar = false }) => {
  return (
    <>
      <SidebarProvider>
        {!hideSidebar && <AppSidebar />}
        <div className="flex h-screen w-full overflow-hidden">
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <main>
              {!hideSidebar && (
                <div className="p-4">
                  <SidebarTrigger />
                </div>
              )}
              <div
                className={`${
                  !hideSidebar && "mx-auto w-full p-4 md:p-6 2xl:p-10"
                }`}
              >
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Layout;
