import {
  Bell,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  Home,
  Mails,
  Map,
  TriangleAlert,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Buildings",
    url: "/buildings",
    icon: Building2,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-[linear-gradient(to_bottom,#0066cc_0%,#ffffff_100%)] text-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="p-4 ">
                <div
                  className={`mb-6 text-center text-2xl font-bold tracking-[0.5px] text-white`}
                >
                  WaterDashboard
                </div>
              </div>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="hover:bg-primary/80 transition-colors"
                    asChild
                  >
                    <a
                      href={item.url}
                      className="flex items-center gap-2 px-6 py-6"
                    >
                      <item.icon className="scale-[300%] p-1 text-white" />
                      <div className="ml-4 text-[18px] text-white">
                        {item.title}
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
