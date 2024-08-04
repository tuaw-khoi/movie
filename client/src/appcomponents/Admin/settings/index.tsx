import { Outlet } from "react-router-dom";
import { IconUser } from "@tabler/icons-react";
import { IconMovie } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { UserNav } from "@/components/ui/user-nav";
import {
  Layout,
  LayoutBody,
  LayoutHeader,
} from "@/components/ui/custom/layout";
import SidebarNav from "./components/sidebar-nav";
import { IconCategory } from "@tabler/icons-react";
export default function Settings() {
  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className="flex flex-col" fixedHeight>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Movie
          </h1>
          <p className="text-muted-foreground">Quản lý tất cả phim</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-1 flex-col space-y-8 sm:overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="sticky top-0 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="w-full p-1 xl:pr-4 lg:max-w-xl">
            <div className="pb-16">
              <Outlet />
            </div>
          </div>
        </div>
      </LayoutBody>
    </Layout>
  );
}

const sidebarNavItems = [
  {
    title: "Quản Lí Phim",
    icon: <IconMovie size={18} />,
    href: "/admin/settings",
  },
  {
    title: "Quốc Gia và Thể Loại",
    icon: <IconCategory size={18} />,
    href: "setMore",
  },
  {
    title: "Quản Lý Người Dùng",
    icon: <IconUser size={18} />,
    href: "managesUser",
  },
];
