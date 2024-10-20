"use client";
import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import LangRenderer from "../lang";
import { useParams } from "next/navigation";
import { CustomLink } from "@/components/ui/custom-link";

const ActionButtons = () => {
  const { lang } = useParams();
  return (
    <div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild aria-label="sidebar-toggler-button">
            <Button variant={"ghost"} size={"icon"}>
              <AlignJustify aria-label="bars icon that triggers the sidebar" />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col items-start space-y-4 text-lg text-black dark:text-white mt-10 w-full ">
                  <Link href={`/${lang}/sign-in`}>
                    {" "}
                    <LangRenderer en={`Sign in`} ar={`تسجيل الدخول`} />
                  </Link>
                  <Link href={`/${lang}`}>
                    {" "}
                    <LangRenderer en={`Get Started`} ar={`لنبدء`} />
                  </Link>
                  <Link href="/">
                    <LangRenderer en={`Pricing`} ar={`الإسعار`} />
                  </Link>
                  <Link href="/">
                    <LangRenderer en={`Contact`} ar={`اتصل بنا`} />
                  </Link>
                  <Link href="/">
                    <LangRenderer en={`About`} ar={`حولنا`} />
                  </Link>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex md:space-x-4 ">
        <CustomLink
          href={`/${lang}/sign-in`}
          aria-label="login button"
          variant="ghost"
        >
          <LangRenderer en={`Sign in`} ar={`تسجيل الدخول`} />
        </CustomLink>
        <Button aria-label="get started button">
          <LangRenderer en={`Get Started`} ar={`لنبدء`} />
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
