/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  LogOut,
  Settings,
  User,
  ChevronRight,
  Home,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Drawer } from "vaul";
import { DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { logout } from "@/data/actions/auth";
import { useRouter } from "next/navigation";

export const AccountNav = () => {
  const route = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      // Optionally refresh the current page to reflect logged out state
      router.refresh();
      // Optionally redirect to login page
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Overview" },
    { href: "/dashboard/profile", icon: User, label: "Your Profile" },
    {
      href: "/dashboard/educational-details",
      icon: GraduationCap,
      label: "Education Details",
    },
    {
      href: "/dashboard/account-setting",
      icon: Settings,
      label: "Account Settings",
    },
  ];

  return (
    <section>
      <div className="flex h-screen bg-gray-50">
        <aside className="w-72 bg-white shadow-lg relative">
          {/* Header */}
          <div className="p-4 ">
            <div className="flex items-center ">
              <div className=" rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <img
                  src="https://onlyeducation.in/images/onlyEducation.svg"
                  className="w-12 h-12 text-primary"
                />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                <span className="!text-orange-600">Only </span>
                <span className="!text-blue-600">Education</span>
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <AccountNavLink key={item.href} href={item.href} route={route!}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </AccountNavLink>
              ))}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="absolute bottom-0 w-full p-6 border-t border-gray-100 bg-white">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start bg-red-50 text-red-600 hover:bg-red-500 hover:text-white hover:border-white transition-colors group"
            >
              <LogOut className="w-4 h-4 mr-3 group-hover:animate-pulse" />
              Logout
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export function DrawerDemo() {
  const route = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      // Optionally refresh the current page to reflect logged out state
      router.refresh();
      // Optionally redirect to login page
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Drawer.Root direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="rounded-xl h-12 w-12 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </DrawerTrigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Drawer.Content className="bg-white flex flex-col rounded-l-2xl h-full w-[320px] fixed right-0 top-0 z-30 shadow-2xl">
          <div className="p-6 flex-1">
            <div className="max-w-md">
              <div className="flex items-center  mb-8">
                <div className=" rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <img
                    src="https://onlyeducation.in/images/onlyEducation.svg"
                    className="w-12 h-12 text-primary"
                  />
                </div>
                <DrawerTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text ">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    <span className="!text-orange-600">Only </span>
                    <span className="!text-blue-600">Education</span>
                  </h1>
                </DrawerTitle>
              </div>

              <nav className="space-y-2">
                <AccountNavLink href="/dashboard" route={route!}>
                  <Home className="w-5 h-5 mr-3" />
                  Overview
                </AccountNavLink>
                <AccountNavLink href="/dashboard/profile" route={route!}>
                  <User className="w-5 h-5 mr-3" />
                  Your Profile
                </AccountNavLink>
                <AccountNavLink
                  href="/dashboard/educational-details"
                  route={route!}
                >
                  <GraduationCap className="w-5 h-5 mr-3" />
                  Education Details
                </AccountNavLink>
                <AccountNavLink
                  href="/dashboard/account-setting"
                  route={route!}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Account Settings
                </AccountNavLink>
              </nav>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors group"
            >
              <LogOut className="w-4 h-4 mr-3 group-hover:animate-pulse" />
              Logout
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

type AccountNavLinkProps = {
  href: string;
  route: string;
  children: React.ReactNode;
};

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href;

  return (
    <Link
      href={href}
      className={`
        group rounded-xl transition-all duration-200 flex items-center px-4 py-3
        hover:scale-[1.02] hover:shadow-sm
        ${active
          ? "bg-blue-600 text-white shadow-md hover:shadow-lg"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }
      `}
    >
      <div className="flex items-center">{children}</div>
      {active && (
        <div className="ml-auto">
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </Link>
  );
};

export default AccountNav;
