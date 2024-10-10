import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

import { i18n } from "../../i18n-config";
import { cn } from "@/lib/utils";

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
  title: "القالب 1",
  description:
    "قالب 1 هو قالب صفحة هبوط للأعمال والتطبيقات التجارية والتجارة الإلكترونية",
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
      <link rel="icon" href="/images/logos/icons8-logo.svg" sizes="any" />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
