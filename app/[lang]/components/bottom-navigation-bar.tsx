"use client";
import { Separator } from "@/components/ui/separator";
import React, { ReactElement } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { BiSolidOffer } from "react-icons/bi";
import { useParams, usePathname } from "next/navigation";
import { Lang } from "@/types";
import { IoCompassOutline } from "react-icons/io5";
import { FaUserGear } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const BottomNavigationBar = ({
  children,
}: {
  children: ReactElement<typeof BottomNavigationBarItem>[]; // Restrict children to be an array of BottomNavigationBarItem
}) => {
  return (
    <div className="hidden phone-only:block fixed w-full bottom-0 left-0">
      <Separator className="bg-primary" />
      <nav>
        <ul className="flex justify-around items-center gap-4 w-full bg-background z-10 px-4">
          {children}
        </ul>
      </nav>
    </div>
  );
};

export const BottomNavigationBarItem = ({
  Icon,
  href,
  title,
  home = false,
}: {
  title: string;
  href: string;
  Icon: IconType;
  home?: boolean;
}) => {
  const pathname = usePathname();
  let isActive = pathname === `${href}` || pathname.startsWith(`${href}/`);
  if (home) {
    isActive = pathname === `${href}`;
  }
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex text-center flex-col gap-1 items-center py-2 text-sm",
          isActive && "text-primary"
        )}
      >
        <Icon size={20} />
        {title}
      </Link>
    </li>
  );
};

export const MobileNavigationBar = () => {
  const { lang }: { lang: Lang } = useParams();
  return (
    <BottomNavigationBar>
      <BottomNavigationBarItem
        Icon={IoCompassOutline}
        title={lang === "ar" ? "استكشاف" : "discover"}
        href={`/${lang}`}
        home
      />
      <BottomNavigationBarItem
        Icon={FaUserGear}
        title={lang === "ar" ? "حسابي" : "account"}
        href={`/${lang}/profile`}
      />
      <BottomNavigationBarItem
        Icon={BiSolidOffer}
        title={lang === "ar" ? "العروض" : "offers"}
        href={`/${lang}/offers`}
      />
    </BottomNavigationBar>
  );
};

export default BottomNavigationBar;
