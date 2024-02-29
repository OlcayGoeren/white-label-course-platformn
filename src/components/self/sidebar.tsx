import React, { useContext, useState } from "react";

import { cn } from "@/lib/utils";
import { ArrowLeft, BarChart3, Book, BookOpenCheck, LayoutDashboard, LayoutList, LucideIcon, Settings, UserRound } from "lucide-react";
import { SideNav } from "./side-nav";
import { SideNavContext } from "@/context/sidenav.context";

interface SidebarProps {
  className?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: string;
  isChidren?: boolean;
  children?: NavItem[];
}

export const NavItems: NavItem[] = [
  {
    title: "Alle Kurse",
    icon: Book,
    href: "/admin/courses",
    color: "text-sky-500",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
    color: "text-orange-500",
  },
  {
    title: "Profil",
    icon: UserRound,
    href: "/admin/profile",
    color: "text-sky-500",
  },
  {
    title: "Erinnerung",
    icon: LayoutList,
    href: "/admin/notifications",
    color: "text-sky-500",
  },
  {
    title: "Erinnerung",
    icon: Settings,
    href: "/admin/settings",
    color: "text-sky-500",
  },
];




export default function Sidebar({ className }: SidebarProps) {
  const { state, dispatch } = useContext(SideNavContext);
  const { isOpen } = state
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    isOpen ? dispatch({ type: "close" }) : dispatch({ type: "open" });
    setStatus(true);
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-20 md:block`,
        status && "duration-500",
        isOpen ? "w-72" : "w-[78px]",
        className
      )}
    >
      <ArrowLeft
        className={cn(
          "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          !isOpen && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <SideNav
              className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
              items={NavItems}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
