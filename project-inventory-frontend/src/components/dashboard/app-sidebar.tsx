import {
  Box,
  CalendarClockIcon,
  FolderPlus,
  HomeIcon,
  LayoutDashboard,
  LayoutList,
  List,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Categorias",
    url: "/categories",
    icon: Search,
  },
  {
    title: "Usuarios",
    url: "/users",
    icon: Users,
  },
  {
    title: "Produtos",
    url: "/products",
    icon: Box,
  },
  {
    title: "Entrada saida",
    url: "/moves",
    icon: CalendarClockIcon,
  },
  {
    title: "Voltar ao site",
    url: "/",
    icon: HomeIcon,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar className="w-50">
      <SidebarContent>
        <SidebarGroup>
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
      <Separator />
    </Sidebar>
  );
}
