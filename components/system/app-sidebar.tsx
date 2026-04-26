"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  LogsIcon
} from "lucide-react"

import { NavMain } from "@/components/system/nav-main"
import { NavUser } from "@/components/system/nav-user"
import { TeamSwitcher } from "@/components/system/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUser } from "@/store/user"



// This is sample data.
const data = {
  teams: [
    {
      name: "Digilabs",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
    },
    {
      title: "Books",
      url: "/book",
      icon: BookOpen,
      items: [
         {
          title: "Book list",
          url: "/book",
        },
        {
          title: "Create",
          url: "/book/create",
        },
        {
          title: "Update",
           url: "/book/update",
        },
      ],
    },
      {
      title: "Logs",
      url: "/logs",
      icon: LogsIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const user = useUser((state) => state.user);
  const mappedUser = user
    ? {
     
        name: user.user_metadata?.full_name  || user.user_metadata?.name|| "User",
        email: user.email || "",
        avatar: user.user_metadata?.avatar_url || "",
      }
    : null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={mappedUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
