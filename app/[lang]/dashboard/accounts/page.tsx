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
import { revalidateTag } from "next/cache";
import { CustomLink } from "@/components/ui/custom-link";
const page = async ({
  searchParams,
}: {
  searchParams: { content?: string };
}) => {
  // revalidateTag("accounts");
  const accounts = await getAccounts({ phoneNumber: searchParams?.content });
  return (
    <main className="phone-only:px-4">
      <div className=" flex justify-between flex-col md:flex-row items-center mx-2 my-2">
        <Breadcrumb className="my-2" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard`}>لوحة التحكم</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ادارة الحسابات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CustomLink href="accounts/new">حساب جديد</CustomLink>
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
