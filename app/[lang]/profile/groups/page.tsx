import AccountsTable from "@/reusable-components/reusable-table";
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
import { getAccounts } from "@/db/accounts";
import { accountsTable } from "./components/accounts-column";
import { CustomLink } from "@/components/ui/custom-link";
import { revalidateTag } from "next/cache";
const page = async ({
  searchParams,
  params: { lang },
}: {
  searchParams: { content?: string };
  params: { lang: string };
}) => {
  revalidateTag("accounts");
  const accounts = await getAccounts({ phoneNumber: searchParams?.content });
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
              <BreadcrumbPage>ادارة الحسابات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CustomLink href={`/${lang}/dashboard/accounts/new`}>
          حساب جديد
        </CustomLink>
      </div>
      <div className=" my-4 md:container">
        <Suspense fallback={"جاري التحميل"}>
          <AccountsTable
            searchPlaceholder="البحث برقم الهاتف"
            data={accounts}
            columns={accountsTable}
            searchQuery="content"
          />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
