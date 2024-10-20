import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

import { i18n } from "../../i18n-config";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Lang } from "@/types";
import ButtonLinkIcon from "./components/button-link-icon";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// export function generateImageMetadata({
//   params,
// }: {
//   params: { lang?: Lang };
// }): Metadata {
//   const lang = params.lang;

//   return lang === "ar"
//     ? {
//         title: "القالب 1",
//         description:
//           "قالب 1 هو قالب صفحة هبوط للأعمال والتطبيقات التجارية والتجارة الإلكترونية",
//         keywords: ["الابتكار التقني", "القالب 1"],
//       }
//     : {
//         title: "Template 1",
//         description:
//           "Template 1 app is a landing page template for business and ecommerce applications",
//         keywords: ["Alebtkar Altqni", "Template 1"],
//       };
// }

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
  return (
    <html
      lang={lang}
      dir={lang === "en" ? "ltr" : "rtl"}
      suppressHydrationWarning
    >
      <head />
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
          {children}
          <div className="fixed transition-all duration-500 hover:gap-5 w-full bottom-10 z-50 left-1 flex items-center gap-2 justify-end px-4">
            <ButtonLinkIcon
              href="https://wa.me/+218928666458"
              Icon={FaWhatsapp}
              bgClass="bg-green-400"
              target={"_blank"}
            />
            <ButtonLinkIcon
              href="https://t.me/zek_z"
              Icon={FaTelegramPlane}
              bgClass="bg-sky-400"
              target={"_blank"}
            />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
