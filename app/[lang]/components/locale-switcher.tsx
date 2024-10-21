"use client";

import { useParams, usePathname } from "next/navigation";
import { CustomLink } from "@/components/ui/custom-link";
import { Lang } from "@/types";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const { lang }: { lang: Lang } = useParams();
  const redirectedPathname = (locale: Lang) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <CustomLink
      href={redirectedPathname(lang === "ar" ? "en" : "ar")}
      variant={"ghost"}
      size={"icon"}
      className={cn(
        "block text-center font-bold text-lg",
        lang === "en" && "content-center"
      )}
    >
      {lang === "ar" ? "ع" : "A"}
    </CustomLink>
  );
}
