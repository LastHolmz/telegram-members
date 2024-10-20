"use client";
import Form from "@/reusable-components/form";
import {
  createUserAction,
  loginUserAction,
  recoverPasswordAction,
  resetPasswordAction,
  verifyUserAction,
} from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/reusable-components/submit-button";
import { CustomLink } from "@/components/ui/custom-link";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

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
      success="تم تسجيل الدخول بنجاح."
      replaceLink={`/${lang}`}
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
      <CustomLink
        className="block my-2 text-foreground"
        variant={"link"}
        href={`/${lang}/recovery-password`}
      >
        نسيت كلمة السر
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
export const RecoverPasswordForm = ({ children }: { children?: ReactNode }) => {
  return (
    <Form
      action={recoverPasswordAction}
      success="تم إرسال تعليمات استعادة كلمة المرور إلى بريدك الإلكتروني."
      replaceLink={`recovery-password?sentToken=true`}
      // dontReplace
    >
      {/* <Input type="hidden" name="id" value={id} /> */}
      <div className=" text-start grid gap-4 mb-4">
        <div>
          <Label htmlFor="email">email</Label>
          <Input
            name="email"
            id="email"
            placeholder="ادخل بريدك الالكتروني"
            required
            type={"email"}
          />
          <p className="text-sm my-2 text-foreground/80">
            يمكنك ايجاد رمز التحقق في بريدك الإلكتروني
          </p>
        </div>
      </div>
      <SubmitButton className="sm:w-auto w-full">تأكيد</SubmitButton>
      <div className="my-2 text-lg">{children}</div>
    </Form>
  );
};

export const ResetPasswordForm = ({ email }: { email: string }) => {
  const { lang } = useParams();
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  useEffect(() => {
    if (password !== verifyPassword) {
      setErrorMessage("كلمات المرور غير متطابقة."); // "Passwords do not match."
    } else {
      setErrorMessage(""); // Clear error message if passwords match
    }
  }, [password, verifyPassword]);

  return (
    <Form
      action={resetPasswordAction}
      replaceLink={`/${lang}`}
      success="تم اعادة ضبط كلمة السر"
    >
      <Input type="hidden" name="email" value={email} />
      <div className="text-start grid gap-4 mb-4">
        <div>
          <Label htmlFor="password">كلمة المرور</Label>
          <div className="relative">
            <Input
              name="password"
              placeholder="ادخل كلمة المرور"
              id="password"
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                "absolute  top-1/2 transform -translate-y-1/2 focus:outline-none",
                lang === "ar" ? "left-3" : "right-3"
              )}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="verifyPassword">تأكيد كلمة المرور</Label>
          <div className="relative">
            <Input
              dir="rtl"
              name="verifyPassword"
              id="verifyPassword"
              required
              type={showVerifyPassword ? "text" : "password"}
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowVerifyPassword(!showVerifyPassword)}
              className={cn(
                "absolute  top-1/2 transform -translate-y-1/2 focus:outline-none",
                lang === "ar" ? "left-3" : "right-3"
              )}
            >
              {showVerifyPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
      </div>
      {/* Check for error message to change button type */}

      <SubmitButton
        disabled={errorMessage ? true : false}
        className="sm:w-auto w-full"
      >
        حفظ
      </SubmitButton>
      <p className="text-red-500">{errorMessage}</p>
    </Form>
  );
};
