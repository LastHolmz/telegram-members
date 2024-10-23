import { getUserById } from "@/db/users";
import { getSession } from "@/lib/auth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Lang } from "@/types";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { CancelSubscriptionForm, PayVoucherForm } from "./components/forms";
import LangBreadcrumbSeparator from "../../components/breadcrumb-separator";
import LangRenderer from "../../components/lang";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import parseHumanDate from "@/lib/date";

const page = async ({ params: { lang } }: { params: { lang: Lang } }) => {
  const session = await getSession();
  if (!session) {
    return (
      <div className="h-screen flex-1 content-center">
        <LangRenderer ar="يجب تسجيل الدخول اولا" en="You must log in first" />
      </div>
    );
  }

  const user = await getUserById(session.id);
  if (!user) {
    return (
      <div className="h-screen flex-1 content-center">
        <LangRenderer
          ar="لا يوجد حساب بهذا المعرف"
          en="No account with this ID exists"
        />
      </div>
    );
  }

  return (
    <div className="mb-24 bg-secondary">
      <div className="container">
        <Breadcrumb className="my-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>
                  <LangRenderer ar="الرئيسية" en="home" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <LangBreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <LangRenderer ar="الملف الشخصي" en="my profile" />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-center">
          <h1>
            <LangRenderer ar="اهلا" en="Hello" />
            <bdi className="font-bold text-2xl mx-2">{user.fullName}</bdi>
          </h1>
          <PayVoucherForm />
        </div>

        <div className="flex flex-col md:w-1/2 lg:h-1/4 gap-3 my-10">
          <div className="flex gap-2 justify-between items-center">
            <span>
              <LangRenderer ar="قيمة الحساب:" en="Account balance:" />
            </span>
            <p className="dark:bg-gray-900 bg-gray-300 font-bold text-center px-2 py-1 rounded text-foreground flex-1">
              {user.money} <LangRenderer ar="دينار" en="Dinars" />
            </p>
          </div>

          <div className="flex gap-2 justify-between items-center">
            <span>
              <LangRenderer ar="الاسم:" en="Name:" />
            </span>
            <p className="dark:bg-gray-900 bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1">
              {user.fullName}
            </p>
          </div>

          <div className="flex gap-2 justify-between items-center">
            <span>
              <LangRenderer ar="موثق:" en="Verified:" />
            </span>
            <div className="dark:bg-gray-900 bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1">
              <div className="mx-auto w-fit">
                {user.verified ? (
                  <IoMdCheckmark size={22} className="text-green-500" />
                ) : (
                  <FaXmark size={22} className="text-red-500" />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-between items-center">
            <span>
              <LangRenderer ar="رقم الهاتف:" en="Phone number:" />
            </span>
            <p className="dark:bg-gray-900 bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1">
              {user.phoneNumber}
            </p>
          </div>

          <div className="flex gap-2 justify-between items-center">
            <span>
              <LangRenderer ar="البريد الالكتروني:" en="Email:" />
            </span>
            <p className="dark:bg-gray-900 bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1">
              {user.email}
            </p>
          </div>
        </div>
        <Separator className="bg-primary mb-2" />

        {user?.Subscription && (
          <section id="subscription-info">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-2xl">
                <LangRenderer ar="معلومات الاشتراك" en="Supscriptoin info" />
              </h2>

              <div className=" flex  phone-only:flex-col gap-1">
                <Button>
                  <LangRenderer ar="تجديد الإشتراك" en="renew" />
                </Button>
                <CancelSubscriptionForm
                  userId={user.id}
                  subscriptoin={user.Subscription}
                />
              </div>
            </div>
            <h3 className=" uppercase font-bold text-primary">
              {user?.Subscription && `${user.Subscription.type}`}
            </h3>

            <div className="flex flex-col md:w-1/2 lg:h-1/4 gap-3 my-10">
              <div className="flex gap-2 justify-between items-center">
                <span>
                  <LangRenderer ar="سعر الإشتراك:" en="Supscriptoin price:" />
                </span>
                <p className="dark:bg-gray-900 bg-gray-300 font-bold text-center px-2 py-1 rounded text-foreground flex-1">
                  {user.Subscription.price}{" "}
                  <LangRenderer ar="دينار" en="Dinars" />
                </p>
              </div>

              <div className="flex gap-2 justify-between items-center">
                <span>
                  <LangRenderer ar="عدد الحسابات:" en="accounts:" />
                </span>
                <p className="dark:bg-gray-900 bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1">
                  {user.Subscription.allowedAccounts}{" "}
                  {lang === "ar" ? "حسابات" : "account"}
                </p>
              </div>

              <div className="flex gap-2 justify-between items-center">
                <span>
                  <LangRenderer ar="مفعل:" en="Valid:" />
                </span>
                <div className="dark:bg-gray-900 bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1">
                  <div className="mx-auto w-fit">
                    {user.verified ? (
                      <IoMdCheckmark size={22} className="text-green-500" />
                    ) : (
                      <FaXmark size={22} className="text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-between items-center">
                <span>
                  <LangRenderer ar="تاريخ الإشتراك:" en="Subscription date:" />
                </span>
                <p className="dark:bg-gray-900 text-sm bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1">
                  <LangRenderer
                    ar={
                      <>
                        {parseHumanDate(
                          user.Subscription.creationDate.toString(),
                          "ar"
                        )}
                      </>
                    }
                    en={
                      <>
                        {parseHumanDate(
                          user.Subscription.creationDate.toString(),
                          "en"
                        )}
                      </>
                    }
                  />
                </p>
              </div>

              <div className="flex gap-2 justify-between items-center">
                <span>
                  <LangRenderer ar="عدد مرات التجديد:" en="Renew Number:" />
                </span>
                <p className="dark:bg-gray-900 bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1">
                  {user.Subscription.renew}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default page;
