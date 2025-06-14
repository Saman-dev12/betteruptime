"use client"

import { Home, Settings, Shield, Activity, Bell, User, BarChart3 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  // {
  //   title: "Monitors",
  //   url: "/dashboard/monitors",
  //   icon: Activity,
  // },
  // {
  //   title: "Analytics",
  //   url: "/dashboard/analytics",
  //   icon: BarChart3,
  // },
  // {
  //   title: "Alerts",
  //   url: "/dashboard/alerts",
  //   icon: Bell,
  // },
  // {
  //   title: "Settings",
  //   url: "/dashboard/settings",
  //   icon: Settings,
  // },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <SidebarHeader className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UptimeGuard
            </span>
            <span className="truncate text-xs text-muted-foreground">Premium Monitoring</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-200 dark:border-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/profile">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
