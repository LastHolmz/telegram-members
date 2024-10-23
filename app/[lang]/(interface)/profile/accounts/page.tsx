import AccountsTable from "@/reusable-components/reusable-table";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getAccounts } from "@/db/accounts";
import { arAccountsTable, enAccountsTable } from "./components/accounts-column";
import { CustomLink } from "@/components/ui/custom-link";
import { getSession } from "@/lib/auth";
import { getUserById } from "@/db/users";
import LangBreadcrumbSeparator from "@/app/[lang]/components/breadcrumb-separator";
import LangRenderer from "@/app/[lang]/components/lang";
import { Lang } from "@/types";

const page = async ({
  searchParams,
  params: { lang },
}: {
  searchParams: { content?: string };
  params: { lang: Lang };
}) => {
  const session = await getSession();
  if (!session) {
    return (
      <div className="h-screen w-full content-center">
        <LangRenderer ar="يجب تسجيل الدخول اولا" en="You must log in first" />
      </div>
    );
  }

  const user = await getUserById(session.id);

  if (!user) {
    return (
      <div className="h-screen w-full content-center">
        <LangRenderer
          ar="لا يوجد حساب بهذا المعرف"
          en="No account found with this ID"
        />
      </div>
    );
  }

  if (!user.Subscription) {
    return (
      <div className=" h-[80%]">
        <Breadcrumb className="my-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>
                  <LangRenderer ar="الرئيسية" en="Home" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <LangBreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}/profile`}>
                  <LangRenderer ar="الملف الشخصي" en="My Profile" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <LangBreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <LangRenderer ar="ادارة الحسابات" en="Manage Accounts" />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="content-center h-full w-fit mx-auto text-center grid gap-3">
          <LangRenderer
            ar="لا يمكنك اضافة حسابات"
            en="You cannot add accounts"
          />
          <CustomLink href={`/${lang}#pricing`} scroll>
            <LangRenderer ar="الإشتراكات" en="Subscriptions" />
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
      <div className="flex md:justify-between justify-start flex-col md:flex-row md:items-center md:mx-2 my-2">
        <Breadcrumb className="my-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>
                  <LangRenderer ar="الرئيسية" en="Home" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <LangBreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}/profile`}>
                  <LangRenderer ar="الملف الشخصي" en="My Profile" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <LangBreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <LangRenderer ar="ادارة الحسابات" en="Manage Accounts" />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CustomLink href={`/${lang}/profile/accounts/new`}>
          <LangRenderer ar="حساب جديد" en="New Account" />
        </CustomLink>
      </div>
      <div className="my-4 md:container">
        <Suspense fallback={<LangRenderer ar="جاري التحميل" en="Loading" />}>
          <AccountsTable
            searchPlaceholder={
              lang === "ar" ? "البحث برقم الهاتف" : "Search by phone number"
            }
            data={accounts}
            columns={lang === "ar" ? arAccountsTable : enAccountsTable}
            searchQuery="content"
          />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
