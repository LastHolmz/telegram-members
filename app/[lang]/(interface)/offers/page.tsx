import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
const page = ({ params: { lang } }: { params: { lang: string } }) => {
  return (
    <main className="bg-secondary h-full  py-2">
      <Breadcrumb className="my-2 mx-4" dir="rtl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}`}>الرئيسية</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-foreground/60">
              العروض
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="h-full content-center text-center">
        <h1 className="font-bold text-xl md:text-2xl">قريبا</h1>
      </div>
    </main>
  );
};

export default page;
