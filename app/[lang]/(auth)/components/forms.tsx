"use client";
import Form from "@/reusable-components/form";
import {
  createUserAction,
  loginUserAction,
  verifyUserAction,
} from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/reusable-components/submit-button";
import { CustomLink } from "@/components/ui/custom-link";
import { useParams } from "next/navigation";

export const SignUpForm = () => {
  const { lang } = useParams();

  return (
    <Form
      action={createUserAction}
      success="يرجى تأكيد الحساب"
      replaceLink="sign-up/verify-email"
    >
      <div className=" text-start grid gap-4 mb-4">
        <div>
          <Label htmlFor="fullName">الاسم</Label>
          <Input
            name="fullName"
            id="fullName"
            placeholder="ادخل اسمك"
            required
            type={"text"}
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">رقم الهاتف</Label>
          <Input
            dir="rtl"
            name="phoneNumber"
            placeholder="ادخل رقم هاتفك"
            id="phoneNumber"
            required
            type={"tel"}
          />
        </div>

        <div>
          <Label htmlFor="email">email</Label>
          <Input
            name="email"
            placeholder="ادخل ايميلك"
            id="email"
            required
            type={"email"}
          />
        </div>
        <div>
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            dir="rtl"
            name="password"
            id="password"
            required
            type={"password"}
          />
        </div>
      </div>
      <SubmitButton className="sm:w-auto w-full">ارسال رمز التحقق</SubmitButton>
      <CustomLink
        className="block my-2"
        variant={"link"}
        href={`/${lang}/sign-in`}
      >
        لديك حساب بالفعل؟ تسجيل الدخول
      </CustomLink>
    </Form>
  );
};
export const SignInForm = () => {
  const { lang } = useParams();

  return (
    <Form
      action={loginUserAction}
      success="تم تسجيل الدخول بنجاح"
      replaceLink="/"
    >
      <div className="text-start grid gap-4 mb-4">
        <div>
          <Label htmlFor="email">email</Label>
          <Input
            name="email"
            placeholder="ادخل ايميلك"
            id="email"
            required
            type={"email"}
          />
        </div>
        <div>
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            dir="rtl"
            name="password"
            id="password"
            required
            type={"password"}
          />
        </div>
      </div>
      <SubmitButton className="sm:w-auto w-full">تسجيل الدخول</SubmitButton>
      <CustomLink
        className="block my-2"
        variant={"link"}
        href={`/${lang}/sign-up`}
      >
        ليس لديك حساب؟ إنشاء مجاني
      </CustomLink>
    </Form>
  );
};

export const VerifyUserForm = ({ id }: { id: string }) => {
  const { lang } = useParams();
  return (
    <Form
      action={verifyUserAction}
      success="تم تأكيد الحساب"
      replaceLink={`/${lang}`}
    >
      <Input type="hidden" name="id" value={id} />
      <div className=" text-start grid gap-4 mb-4">
        <div>
          <Label htmlFor="verificationCode">رمز التحقق</Label>
          <Input
            name="verificationCode"
            id="verificationCode"
            placeholder="ادخل رمز التحقق"
            required
            type={"number"}
          />
          <p className="text-sm my-2 text-foreground/80">
            يمكنك ايجاد رمز التحقق في بريدك الإلكتروني
          </p>
        </div>
      </div>
      <SubmitButton className="sm:w-auto w-full">تأكيد</SubmitButton>
    </Form>
  );
};
export const RecoverPasswordForm = () => {
  const { lang } = useParams();
  return (
    <Form
      action={verifyUserAction}
      success="تم إرسال تعليمات استعادة كلمة المرور إلى بريدك الإلكتروني"
      replaceLink={`recovery-password/`}
    >
      {/* <Input type="hidden" name="id" value={id} /> */}
      <div className=" text-start grid gap-4 mb-4">
        <div>
          <Label htmlFor="verificationCode">رمز التحقق</Label>
          <Input
            name="verificationCode"
            id="verificationCode"
            placeholder="ادخل رمز التحقق"
            required
            type={"number"}
          />
          <p className="text-sm my-2 text-foreground/80">
            يمكنك ايجاد رمز التحقق في بريدك الإلكتروني
          </p>
        </div>
      </div>
      <SubmitButton className="sm:w-auto w-full">تأكيد</SubmitButton>
    </Form>
  );
};
