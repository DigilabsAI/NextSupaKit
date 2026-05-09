"use client";

import * as React from "react";
import {
  BookOpen,
  PieChart,
  Settings2,
  LogsIcon,
  UserCheck,
} from "lucide-react";

import { NavMain } from "@/components/system/nav-main";
import { NavUser } from "@/components/system/nav-user";
import { TeamSwitcher } from "@/components/system/team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { Skeleton } from "@/components/ui/skeleton";

import { useUser } from "@/store/user";
import { LogoIcon } from "../marketing/logo";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = useUser((state) => state.user);

  const isLoading = user === null;

  const mappedUser = user
    ? {
      name: user.claims?.user_metadata?.fullname || "User",
      email: user.email || "",
      avatar: user.claims?.user_metadata?.avatar_url || "",
      role: user.claims?.user_metadata?.role || "user",
    }
    : null;

  const isAdmin = mappedUser?.role === "admin";

  const data = {
    teams: [
      {
        name: "Digilabs",
        logo: LogoIcon,
        plan: "Enterprise",
      },
    ],

    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: PieChart,
      },
      {
        title: "Items",
        url: "/items",
        icon: BookOpen,
        items: [
          { title: "Item List", url: "/items" },
          { title: "Create", url: "/items/create" },
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

      ...(isAdmin
        ? [
          {
            title: "Admin Page",
            url: "/admin",
            icon: UserCheck,
          },
        ]
        : []),
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {isLoading ? (
          <div className="flex items-center gap-3 p-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ) : (
          <NavUser user={mappedUser} />
        )}
      </SidebarHeader>

      <SidebarContent>
        {isLoading ? (
          <div className="space-y-3 p-2">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        ) : (
          <NavMain items={data.navMain} />
        )}
      </SidebarContent>

      <SidebarFooter>
        {isLoading ? (
          <div className="space-y-2 p-2">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ) : (
          <TeamSwitcher teams={data.teams} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}