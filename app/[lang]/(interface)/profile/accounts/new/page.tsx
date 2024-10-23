import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { SendCodeForm } from "../components/forms";
import LangBreadcrumbSeparator from "@/app/[lang]/components/breadcrumb-separator";
import LangRenderer from "@/app/[lang]/components/lang";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/db/users";

const page = async ({ params: { lang } }: { params: { lang: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect(`/${lang}/sign-in`);
  }
  const user = await getUserById(session.id);
  if (!user) {
    redirect(`/${lang}/sign-in`);
  }
  if (!user?.Subscription) {
    return <main></main>;
  }
  return (
    <main className="px-2">
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
            <BreadcrumbLink asChild>
              <Link href={`/${lang}/profile/accounts`}>
                <LangRenderer ar="ادارة الحسابات" en="Manage Accounts" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <LangBreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <LangRenderer ar="جديد" en="New" />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div></div>
      <div className="min-h-[80vh] w-full lg:w-1/2 container flex justify-center items-center">
        <SendCodeForm ownerId={session.id} />
      </div>
    </main>
  );
};

export default page;
