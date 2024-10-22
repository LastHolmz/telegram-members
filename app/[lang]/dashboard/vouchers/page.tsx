import UsersTable from "@/reusable-components/reusable-table";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { CustomLink } from "@/components/ui/custom-link";
// import { getUsers } from "@/db/users";
// import { revalidateTag } from "next/cache";
import { vouchersTable } from "./components/vouchers-column";
import { revalidateTag } from "next/cache";
import prisma from "@/prisma/db";
import { getVouchers } from "@/db/vouchers";
import { GenerateVoucherForm } from "./components/forms";
const page = async ({
  searchParams,
  params: { lang },
}: {
  searchParams: { content?: string };
  params: { lang: string };
}) => {
  // await prisma.user.updateMany({ data: { money: 0 } });
  // revalidateTag("users");
  const vouchers = await getVouchers({ code: searchParams?.content });
  return (
    <main className="phone-only:px-4">
      <div className=" flex md:justify-between  justify-start flex-col  md:flex-row md:items-center md:mx-2 my-2">
        <Breadcrumb className="my-2" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}/dashboard`}>لوحة التحكم</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ادارة المالية</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <GenerateVoucherForm />
      <div className=" my-4 md:container">
        <Suspense fallback={"جاري التحميل"}>
          <UsersTable
            searchPlaceholder="البحث بالكود"
            data={vouchers}
            columns={vouchersTable}
            searchQuery="content"
          />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
