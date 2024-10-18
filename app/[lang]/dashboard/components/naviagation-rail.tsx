"use client";
import { Sidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FaUsers } from "react-icons/fa";
import { RiPresentationFill } from "react-icons/ri";
import {
  MdAttachEmail,
  MdLocalOffer,
  MdSupervisorAccount,
} from "react-icons/md";

import { SiStatista } from "react-icons/si";

import { IconType } from "react-icons/lib";
import { CustomLink } from "@/components/ui/custom-link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiMiniBars2 } from "react-icons/hi2";
import ToggleTheme from "@/app/[lang]/components/theme-toggle";

const NavigationRailItem = ({
  pathname,
  href,
  collapsed,
  Icon,
  name,
  onClick,
}: {
  pathname: string;
  href: string;
  collapsed: boolean;
  Icon: IconType;
  name: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}) => {
  const { lang } = useParams();

  return (
    <CustomLink
      aria-label={name}
      onClick={onClick}
      className={cn(
        "flex justify-between transition-all md:rounded-[0px] items-center w-full gap-1 sm:gap-2",
        collapsed && "justify-center"
      )}
      size={"lg"}
      href={href}
      variant={
        pathname === `/${lang}${href}` || pathname.startsWith(`/lang${href}/`)
          ? "default"
          : "ghost"
      }
    >
      <div>{!collapsed && <span>{name}</span>}</div>
      <div>
        <Icon size={18} />
      </div>
    </CustomLink>
  );
};
const NavigationRailHomeItem = ({
  pathname,
  href,
  collapsed,
  Icon,
  name,
  onClick,
}: {
  pathname: string;
  href: string;
  collapsed: boolean;
  Icon: IconType;
  name: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}) => {
  const { lang } = useParams();
  return (
    <CustomLink
      onClick={onClick}
      aria-label={name}
      className={cn(
        "flex justify-between transition-all md:rounded-[0px] items-center w-full gap-1 sm:gap-2",
        collapsed && "justify-center"
      )}
      size={"lg"}
      href={href}
      variant={pathname === `/${lang}${href}` ? "default" : "ghost"}
    >
      <div>{!collapsed && <span>{name}</span>}</div>
      <div>
        <Icon />
      </div>
    </CustomLink>
  );
};

const NavigationRail = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "hsl(var(--secondary))",
        },
      }}
      rtl
      className="fixed top-0 right-0 bg-background h-screen"
      collapsed={collapsed}
    >
      <div
        className={cn(
          "w-full flex items-center justify-end px-2 py-2",
          collapsed && "justify-center px-0 py-2"
        )}
      >
        {" "}
        <Button
          dir="rtl"
          size={"icon"}
          variant={"ghost"}
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </Button>
      </div>
      <Menu>
        <NavigationRailHomeItem
          pathname={pathname}
          collapsed={collapsed}
          href="/dashboard"
          Icon={SiStatista}
          name="لوحة التحكم"
        />
        <NavigationRailItem
          pathname={pathname}
          collapsed={collapsed}
          href="/dashboard/accounts"
          Icon={MdSupervisorAccount}
          name="حساباتي"
        />
        <NavigationRailItem
          pathname={pathname}
          collapsed={collapsed}
          Icon={MdAttachEmail}
          href="/dashboard/contact"
          name="الرسائل"
        />
        <NavigationRailItem
          pathname={pathname}
          collapsed={collapsed}
          href="/dashboard/users"
          Icon={FaUsers}
          name="المستخدمين"
        />
        <NavigationRailItem
          pathname={pathname}
          collapsed={collapsed}
          href="/dashboard/orders"
          Icon={MdLocalOffer}
          name="الفواتير"
        />
      </Menu>
    </Sidebar>
  );
};

export const DashboardNavigation = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger className="block md:hidden">
        <Button asChild variant={"ghost"} size={"icon"}>
          <HiMiniBars2 size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <nav className="w-full mt-10">
          <ul className="flex items-center flex-col h-full text-center justify-center gap-5 w-full">
            <li className="w-full">
              <NavigationRailHomeItem
                onClick={() => setOpen(!open)}
                pathname={pathname}
                collapsed={false}
                href="/dashboard"
                Icon={SiStatista}
                name="لوحة التحكم"
              />
            </li>
            <li className="w-full">
              <NavigationRailItem
                pathname={pathname}
                onClick={() => setOpen(!open)}
                collapsed={false}
                href="/dashboard/accounts"
                Icon={MdSupervisorAccount}
                name="حساباتي"
              />
            </li>
            <li className="w-full">
              <NavigationRailItem
                pathname={pathname}
                onClick={() => setOpen(!open)}
                collapsed={false}
                Icon={MdAttachEmail}
                href="/dashboard/contact"
                name="الرسائل"
              />
            </li>
          </ul>
        </nav>
        <div className="flex justify-center items-center flex-col gap-1"></div>
      </SheetContent>
    </Sheet>
  );
};

export const DashboardHeader = () => {
  return (
    <header className="w-full phone-only:flex justify-between items-center hidden   bg-secondary px-4 py-2">
      <DashboardNavigation />
      <ToggleTheme />
    </header>
  );
};

export default NavigationRail;
