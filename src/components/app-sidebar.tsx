import * as React from "react";
import {
  IconCalendar,
  IconDoorExit,
  IconPhoto,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { VersionSwitcher } from "@/components/version-switcher";
import supabase from "@/supabase";
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
      title: "Log out",
      url: "#",
      icon: IconDoorExit,
      action: "logout",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) {
      console.error("Failed to log out:", error.message);
      return;
    }

    navigate("/auth/sign-in", { replace: true });
  };

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
        {data.navMain.map((item) => {
          const isLogOut = item.action === "logout";

          return (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel asChild={isLogOut}>
                {isLogOut ? (
                  <button type="button" onClick={handleLogOut}>
                    {item.icon && <item.icon className="mr-2" />}
                    {item.title}
                  </button>
                ) : (
                  <>
                    {item.icon && <item.icon className="mr-2" />}
                    {item.title}
                  </>
                )}
              </SidebarGroupLabel>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
