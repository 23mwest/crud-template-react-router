import * as React from "react";
import {
  IconCalendar,
  IconDoorExit,
  IconPhoto,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha"],
  navMain: [
    {
      title: "Photos",
      url: "#",
      icon: IconPhoto,
    },
    {
      title: "Participants",
      url: "#",
      icon: IconUsers,
    },
    {
      title: "Events",
      url: "#",
      icon: IconCalendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Log Out",
      url: "#",
      icon: IconDoorExit,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>
              {item.icon && <item.icon className="mr-2" />}
              {item.title}
            </SidebarGroupLabel>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
