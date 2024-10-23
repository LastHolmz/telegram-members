import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import LangRenderer from "../../components/lang";
import LangBreadcrumbSeparator from "../../components/breadcrumb-separator";
const page = ({ params: { lang } }: { params: { lang: string } }) => {
  return (
    <main className="bg-secondary h-3/4 mt-20 md:mt-28">
      <Breadcrumb className="my-2 mx-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}`}>
                <LangRenderer ar={"الرئيسية"} en={"home"} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <LangBreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage
              className="tex
            
            t-foreground/60"
            >
              <LangRenderer ar={"العروض"} en={"offers"} />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="h-full content-center text-center">
        <h1 className="font-bold text-xl md:text-2xl">
          <LangRenderer ar={"قريبا..."} en={"Soon..."} />
        </h1>
      </div>
    </main>
  );
};

export default page;
