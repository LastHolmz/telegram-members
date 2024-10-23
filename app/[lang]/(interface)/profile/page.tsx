import { getUserById } from "@/db/users";
import { getSession } from "@/lib/auth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Lang } from "@/types";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { PayVoucherForm } from "./components/forms";
const page = async ({ params: { lang } }: { params: { lang: Lang } }) => {
  const session = await getSession();
  if (!session) {
    return (
      <div className="h-screen flex-1 content-center">
        يجب تسجيل الدخول اولا
      </div>
    );
  }
  const user = await getUserById(session.id);
  if (!user) {
    return (
      <div className="h-screen flex-1 content-center">
        لا يوجد حساب بهذا المعرف
      </div>
    );
  }
  return (
    <div>
      <div className="container">
        <Breadcrumb className="my-2" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>الملف الشخصي</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className=" flex justify-between items-center">
          <h1 className="">
            اهلا
            <bdi className="font-bold text-2xl mx-2">{user.fullName}</bdi>
          </h1>
          <PayVoucherForm />
        </div>
        <div className="flex flex-col md:w-1/2 lg:h-1/4 gap-3 my-10">
          <div className="flex gap-2 justify-between items-center">
            <span>قيمة الحساب:</span>
            <p className=" dark:bg-gray-900 bg-gray-300 font-bold text-center px-2 py-1 rounded text-foreground flex-1 ">
              {user.money} دينار
            </p>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <span>الاسم:</span>
            <p className=" dark:bg-gray-900 bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1 ">
              {user.fullName}
            </p>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <span>موثق:</span>
            <div className=" dark:bg-gray-900 bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1 ">
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
            <span>رقم الهاتف:</span>
            <p className=" dark:bg-gray-900 bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1 ">
              {user.phoneNumber}
            </p>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <span>البريد الالكتروني:</span>
            <p className=" dark:bg-gray-900 bg-gray-300 text-center px-2 py-1 rounded text-foreground flex-1 ">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
