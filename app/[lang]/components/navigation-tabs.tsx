"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CustomLink } from "@/components/ui/custom-link";
// import { buttonVariants } from "@/lib/constant";

interface TabLinkProps {
  href: string;
  content: string;
  className?: string;
}

export default function NavigationTabs({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <nav
      className={cn(
        "flex flex-row justify-around md:justify-start flex-wrap gap-1 px-4 py-2 bg-background",
        className
      )}
    >
      {children}
    </nav>
  );
}

export function TabLink({ href, content, className }: TabLinkProps) {
  const pathname = usePathname();
  return (
    <div className="relative w-fit my-1">
      <Link
        className={cn(
          className,
          "flex-center text-sm  h-12 px-4 transition-all py-2 rounded-sm",
          pathname.startsWith(href)
            ? "text-primary"
            : "dark:text-white text-black hover:bg-primary/30"
        )}
        href={href}
      >
        {content}
      </Link>
      <div
        className={cn(
          "h-0.5 w-full transition-all rounded-t-lg",
          pathname.startsWith(href) && "bg-primary"
        )}
      />
    </div>
  );
}
export function HomeTabLink({ href, content, className }: TabLinkProps) {
  const pathname = usePathname();
  return (
    <div className="relative my-1 w-fit">
      <Link
        className={cn(
          className,
          "flex-center text-sm  h-12 px-4 transition-all py-2 rounded-sm",
          pathname === `${href}`
            ? "text-primary"
            : "dark:text-white text-black hover:bg-primary/30"
        )}
        href={href}
      >
        {content}
      </Link>
      <div
        className={cn(
          "h-0.5 w-full transition-all rounded-t-lg",
          pathname === `${href}` && "bg-primary"
        )}
      />
    </div>
  );
}
