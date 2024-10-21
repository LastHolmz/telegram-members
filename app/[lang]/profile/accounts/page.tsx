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
import { getSession } from "@/lib/auth";
import { getUserById } from "@/db/users";
const page = async ({
  searchParams,
  params: { lang },
}: {
  searchParams: { content?: string };
  params: { lang: string };
}) => {
  const session = await getSession();
  if (!session) {
    return (
      <div className="h-screen w-full content-center">
        يجب تسجيل الدخول اولا
      </div>
    );
  }
  const user = await getUserById(session.id);

  if (!user) {
    return (
      <div className="h-screen w-full content-center">
        لا يوجد حساب بهذا المعرف
      </div>
    );
  }
  if (!user.Subscription) {
    return (
      <div className=" h-[80%]">
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
                <Link href={`/${lang}/profile`}>الملف الشخصي</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ادارة الحسابات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="content-center h-full w-fit mx-auto text-center grid gap-3">
          <div>لا يمكنك اضافة حسابات</div>
          <CustomLink href={`/${lang}#pricing`} scroll>
            الإشتراكات
          </CustomLink>
        </div>
      </div>
    );
  }
  const accounts = await getAccounts({
    phoneNumber: searchParams?.content,
    userId: user.id,
  });
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
                <Link href={`/${lang}/profile`}>الملف الشخصي</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>ادارة الحسابات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CustomLink href={`/${lang}/profile/accounts/new`}>
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
