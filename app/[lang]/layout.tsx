import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { i18n } from "../../i18n-config";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Lang } from "@/types";
import { AuthProvider } from "@/context/user";
import { getSession } from "@/lib/auth";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "TeMe",
  description: "Grow Your Telegram Community in Seconds ",
  keywords: ["الابتكار التقني", "القالب 1"],
};

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Lang };
}>) {
  const user = await getSession();
  return (
    <html
      lang={lang}
      dir={lang === "en" ? "ltr" : "rtl"}
      suppressHydrationWarning
    >
      <body
        className={cn(
          lang === "ar" ? cairo.className : outfit.className,
          "relative"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider user={user}>{children}</AuthProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
