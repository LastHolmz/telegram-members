// "use client";
// import Form from "@/reusable-components/form";
// import {
//   createUserAction,
//   loginUserAction,
//   recoverPasswordAction,
//   resetPasswordAction,
//   verifyUserAction,
// } from "../actions";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import SubmitButton from "@/reusable-components/submit-button";
// import { CustomLink } from "@/components/ui/custom-link";
// import { useParams } from "next/navigation";
// import {
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useEffect,
//   useState,
// } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { cn } from "@/lib/utils";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
// import { Lang } from "@/types";

// export const SignUpForm = () => {
//   const { lang } = useParams();

//   return (
//     <Form
//       action={createUserAction}
//       success="يرجى تأكيد الحساب"
//       replaceLink="sign-up/verify-email"
//     >
//       <div className=" text-start grid gap-4 mb-4">
//         <div>
//           <Label htmlFor="fullName">الاسم</Label>
//           <Input
//             name="fullName"
//             id="fullName"
//             placeholder="ادخل اسمك"
//             required
//             type={"text"}
//           />
//         </div>
//         <div>
//           <Label htmlFor="phoneNumber">رقم الهاتف</Label>
//           <Input
//             dir="rtl"
//             name="phoneNumber"
//             placeholder="ادخل رقم هاتفك"
//             id="phoneNumber"
//             required
//             type={"tel"}
//           />
//         </div>

//         <div>
//           <Label htmlFor="email">email</Label>
//           <Input
//             name="email"
//             placeholder="ادخل ايميلك"
//             id="email"
//             required
//             type={"email"}
//           />
//         </div>
//         <div>
//           <Label htmlFor="password">كلمة المرور</Label>
//           <Input
//             dir="rtl"
//             name="password"
//             id="password"
//             required
//             type={"password"}
//           />
//         </div>
//       </div>
//       <SubmitButton className="sm:w-auto w-full">ارسال رمز التحقق</SubmitButton>
//       <CustomLink
//         className="block my-2"
//         variant={"link"}
//         href={`/${lang}/sign-in`}
//       >
//         لديك حساب بالفعل؟ تسجيل الدخول
//       </CustomLink>
//     </Form>
//   );
// };
// export const SignInForm = () => {
//   const { lang } = useParams();

//   return (
//     <Form
//       action={loginUserAction}
//       success="تم تسجيل الدخول بنجاح."
//       replaceLink={`/${lang}`}
//     >
//       <div className="text-start grid gap-4 mb-4">
//         <div>
//           <Label htmlFor="email">email</Label>
//           <Input
//             name="email"
//             placeholder="ادخل ايميلك"
//             id="email"
//             required
//             type={"email"}
//           />
//         </div>
//         <div>
//           <Label htmlFor="password">كلمة المرور</Label>
//           <Input
//             dir="rtl"
//             name="password"
//             id="password"
//             required
//             type={"password"}
//           />
//         </div>
//       </div>
//       <SubmitButton className="sm:w-auto w-full">تسجيل الدخول</SubmitButton>
//       <CustomLink
//         className="block my-2"
//         variant={"link"}
//         href={`/${lang}/sign-up`}
//       >
//         ليس لديك حساب؟ إنشاء مجاني
//       </CustomLink>
//       <CustomLink
//         className="block my-2 text-foreground"
//         variant={"link"}
//         href={`/${lang}/recovery-password`}
//       >
//         نسيت كلمة السر
//       </CustomLink>
//     </Form>
//   );
// };

// export const VerifyEmailForm = ({ id }: { id: string }) => {
//   const { lang }: { lang: Lang } = useParams();
//   const [otp, setOtp] = useState("");

//   return (
//     <Form
//       action={verifyUserAction}
//       success="تم تأكيد الحساب"
//       replaceLink={`/${lang}`}
//     >
//       <Input type="hidden" name="id" value={id} />
//       <Input
//         name="verificationCode"
//         id="verificationCode"
//         required
//         value={otp}
//         type={"hidden"}
//       />
//       <div className=" text-start grid gap-4 mb-4">
//         <Label htmlFor="verificationCode" className="text-center">
//           رمز التحقق
//         </Label>
//         <div className=" mx-auto  text-center">
//           <InputOTPPattern otp={otp} setOtp={setOtp} />

//           <p className="text-sm my-2 text-foreground/80">
//             يمكنك ايجاد رمز التحقق في بريدك الإلكتروني
//           </p>
//         </div>
//       </div>
//       <SubmitButton className="sm:w-auto w-full">تأكيد</SubmitButton>
//     </Form>
//   );
// };
// export const RecoverPasswordForm = ({ children }: { children?: ReactNode }) => {
//   return (
//     <Form
//       action={recoverPasswordAction}
//       success="تم إرسال تعليمات استعادة كلمة المرور إلى بريدك الإلكتروني."
//       replaceLink={`recovery-password?sentToken=true`}
//       // dontReplace
//     >
//       {/* <Input type="hidden" name="id" value={id} /> */}
//       <div className=" text-start grid gap-4 mb-4">
//         <div>
//           <Label htmlFor="email">email</Label>
//           <Input
//             name="email"
//             id="email"
//             placeholder="ادخل بريدك الالكتروني"
//             required
//             type={"email"}
//           />
//           <p className="text-sm my-2 text-foreground/80">
//             يمكنك ايجاد رمز التحقق في بريدك الإلكتروني
//           </p>
//         </div>
//       </div>
//       <SubmitButton className="sm:w-auto w-full">تأكيد</SubmitButton>
//       <div className="my-2 text-lg">{children}</div>
//     </Form>
//   );
// };

// export const ResetPasswordForm = ({ email }: { email: string }) => {
//   const { lang } = useParams();

//   const [password, setPassword] = useState("");
//   const [verifyPassword, setVerifyPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showVerifyPassword, setShowVerifyPassword] = useState(false);

//   useEffect(() => {
//     if (password !== verifyPassword) {
//       setErrorMessage("كلمات المرور غير متطابقة."); // "Passwords do not match."
//     } else {
//       setErrorMessage(""); // Clear error message if passwords match
//     }
//   }, [password, verifyPassword]);

//   return (
//     <Form
//       action={resetPasswordAction}
//       replaceLink={`/${lang}`}
//       success="تم اعادة ضبط كلمة السر"
//     >
//       <Input type="hidden" name="email" value={email} />
//       <div className="text-start grid gap-4 mb-4">
//         <div>
//           <Label htmlFor="password">كلمة المرور</Label>
//           <div className="relative">
//             <Input
//               name="password"
//               placeholder="ادخل كلمة المرور"
//               id="password"
//               required
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className={cn(
//                 "absolute  top-1/2 transform -translate-y-1/2 focus:outline-none",
//                 lang === "ar" ? "left-3" : "right-3"
//               )}
//             >
//               {showPassword ? <EyeOff /> : <Eye />}
//             </button>
//           </div>
//         </div>
//         <div>
//           <Label htmlFor="verifyPassword">تأكيد كلمة المرور</Label>
//           <div className="relative">
//             <Input
//               dir="rtl"
//               name="verifyPassword"
//               id="verifyPassword"
//               required
//               type={showVerifyPassword ? "text" : "password"}
//               value={verifyPassword}
//               onChange={(e) => setVerifyPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={() => setShowVerifyPassword(!showVerifyPassword)}
//               className={cn(
//                 "absolute  top-1/2 transform -translate-y-1/2 focus:outline-none",
//                 lang === "ar" ? "left-3" : "right-3"
//               )}
//             >
//               {showVerifyPassword ? <EyeOff /> : <Eye />}
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Check for error message to change button type */}

//       <SubmitButton
//         disabled={errorMessage ? true : false}
//         className="sm:w-auto w-full"
//       >
//         حفظ
//       </SubmitButton>
//       <p className="text-red-500">{errorMessage}</p>
//     </Form>
//   );
// };

// export function InputOTPPattern({
//   setOtp,
//   otp,
// }: {
//   setOtp: Dispatch<SetStateAction<string>>;
//   otp: string;
// }) {
//   return (
//     <InputOTP
//       dir="ltr"
//       autoFocus
//       value={otp}
//       onChange={(otp) => setOtp(otp)}
//       maxLength={6}
//       pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
//     >
//       <InputOTPGroup dir="ltr">
//         <InputOTPSlot className=" border-foreground" index={3} />
//         <InputOTPSlot className=" border-foreground" index={4} />
//         <InputOTPSlot className=" border-foreground" index={5} />
//       </InputOTPGroup>
//       <InputOTPSeparator />

//       <InputOTPGroup dir="ltr">
//         <InputOTPSlot
//           id="verificationCode"
//           autoFocus
//           className=" border-foreground"
//           index={0}
//         />
//         <InputOTPSlot className=" border-foreground" index={1} />
//         <InputOTPSlot className=" border-foreground" index={2} />
//       </InputOTPGroup>
//     </InputOTP>
//   );
// }

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
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Lang } from "@/types";

// Language Renderer Component
const LangRenderer = ({
  ar,
  en,
}: {
  ar: string | ReactNode;
  en: string | ReactNode;
}) => {
  const { lang } = useParams();
  return lang === "ar" ? <>{ar}</> : <>{en}</>;
};

export const SignUpForm = () => {
  const { lang } = useParams();

  return (
    <Form
      action={createUserAction}
      success="يرجى تأكيد الحساب"
      replaceLink="sign-up/verify-email"
    >
      <div className="text-start grid gap-4 mb-4">
        <div>
          <Label htmlFor="fullName">
            <LangRenderer ar="الاسم" en="Full Name" />
          </Label>
          <Input
            name="fullName"
            id="fullName"
            placeholder={lang === "ar" ? "ادخل اسمك" : "Enter your name"}
            required
            type="text"
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">
            <LangRenderer ar="رقم الهاتف" en="Phone Number" />
          </Label>
          <Input
            dir={lang === "ar" ? "rtl" : "ltr"}
            name="phoneNumber"
            id="phoneNumber"
            placeholder={
              lang === "ar" ? "ادخل رقم هاتفك" : "Enter your phone number"
            }
            required
            type="tel"
          />
        </div>
        <div>
          <Label htmlFor="email">
            <LangRenderer ar="البريد الإلكتروني" en="Email" />
          </Label>
          <Input
            name="email"
            id="email"
            placeholder={lang === "ar" ? "ادخل ايميلك" : "Enter your email"}
            required
            type="email"
          />
        </div>
        <div>
          <Label htmlFor="password">
            <LangRenderer ar="كلمة المرور" en="Password" />
          </Label>
          <Input
            dir={lang === "ar" ? "rtl" : "ltr"}
            name="password"
            id="password"
            placeholder={
              lang === "ar" ? "ادخل كلمة المرور" : "Enter your password"
            }
            required
            type="password"
          />
        </div>
      </div>
      <SubmitButton className="sm:w-auto w-full">
        <LangRenderer ar="ارسال رمز التحقق" en="Send Verification Code" />
      </SubmitButton>
      <CustomLink
        className="block my-2"
        variant="link"
        href={`/${lang}/sign-in`}
      >
        <LangRenderer
          ar="لديك حساب بالفعل؟ تسجيل الدخول"
          en="Already have an account? Sign In"
        />
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
          <Label htmlFor="email">
            <LangRenderer ar="البريد الإلكتروني" en="Email" />
          </Label>
          <Input
            name="email"
            id="email"
            placeholder={lang === "ar" ? "ادخل ايميلك" : "Enter your email"}
            required
            type="email"
          />
        </div>
        <div>
          <Label htmlFor="password">
            <LangRenderer ar="كلمة المرور" en="Password" />
          </Label>
          <Input
            dir={lang === "ar" ? "rtl" : "ltr"}
            name="password"
            id="password"
            placeholder={
              lang === "ar" ? "ادخل كلمة المرور" : "Enter your password"
            }
            required
            type="password"
          />
        </div>
      </div>
      <SubmitButton className="sm:w-auto w-full">
        <LangRenderer ar="تسجيل الدخول" en="Sign In" />
      </SubmitButton>
      <CustomLink
        className="block my-2"
        variant="link"
        href={`/${lang}/sign-up`}
      >
        <LangRenderer
          ar="ليس لديك حساب؟ إنشاء مجاني"
          en="Don't have an account? Sign Up"
        />
      </CustomLink>
      <CustomLink
        className="block my-2 text-foreground"
        variant="link"
        href={`/${lang}/recovery-password`}
      >
        <LangRenderer ar="نسيت كلمة السر" en="Forgot Password" />
      </CustomLink>
    </Form>
  );
};

export const VerifyEmailForm = ({ id }: { id: string }) => {
  const { lang } = useParams();
  const [otp, setOtp] = useState("");

  return (
    <Form
      action={verifyUserAction}
      success="تم تأكيد الحساب"
      replaceLink={`/${lang}`}
    >
      <Input type="hidden" name="id" value={id} />
      <Input
        name="verificationCode"
        id="verificationCode"
        required
        value={otp}
        type="hidden"
      />
      <div className="text-start grid gap-4 mb-4">
        <Label htmlFor="verificationCode" className="text-center">
          <LangRenderer ar="رمز التحقق" en="Verification Code" />
        </Label>
        <div className="mx-auto text-center">
          <InputOTPPattern otp={otp} setOtp={setOtp} />
          <p className="text-sm my-2 text-foreground/80">
            <LangRenderer
              ar="يمكنك ايجاد رمز التحقق في بريدك الإلكتروني"
              en="You can find the verification code in your email"
            />
          </p>
        </div>
      </div>
      <SubmitButton className="sm:w-auto w-full">
        <LangRenderer ar="تأكيد" en="Confirm" />
      </SubmitButton>
    </Form>
  );
};

export const RecoverPasswordForm = ({ children }: { children?: ReactNode }) => {
  const { lang } = useParams();

  return (
    <Form
      action={recoverPasswordAction}
      success="تم إرسال تعليمات استعادة كلمة المرور إلى بريدك الإلكتروني."
      replaceLink={`recovery-password?sentToken=true`}
    >
      <div className="text-start grid gap-4 mb-4">
        <div>
          <Label htmlFor="email">
            <LangRenderer ar="البريد الإلكتروني" en="Email" />
          </Label>
          <Input
            name="email"
            id="email"
            placeholder={
              lang === "ar" ? "ادخل بريدك الالكتروني" : "Enter your email"
            }
            required
            type="email"
          />
          <p className="text-sm my-2 text-foreground/80">
            <LangRenderer
              ar="ستجد تعليمات استعادة كلمة المرور في بريدك الإلكتروني"
              en="You will find the password recovery instructions in your email"
            />
          </p>
        </div>
      </div>
      <SubmitButton className="sm:w-auto w-full">
        <LangRenderer ar="تأكيد" en="Confirm" />
      </SubmitButton>
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
      setErrorMessage(
        lang === "ar" ? "كلمات المرور غير متطابقة." : "Passwords do not match."
      );
    } else {
      setErrorMessage("");
    }
  }, [password, verifyPassword, lang]);

  return (
    <Form
      action={resetPasswordAction}
      replaceLink={`/${lang}`}
      success="تم اعادة ضبط كلمة السر"
    >
      <Input type="hidden" name="email" value={email} />
      <div className="text-start grid gap-4 mb-4">
        <div>
          <Label htmlFor="password">
            <LangRenderer ar="كلمة المرور" en="Password" />
          </Label>
          <div className="relative">
            <Input
              dir={lang === "ar" ? "rtl" : "ltr"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                lang === "ar" ? "ادخل كلمة المرور" : "Enter password"
              }
              required
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 flex items-center px-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="verifyPassword">
            <LangRenderer ar="تأكيد كلمة المرور" en="Verify Password" />
          </Label>
          <div className="relative">
            <Input
              dir={lang === "ar" ? "rtl" : "ltr"}
              id="verifyPassword"
              name="verifyPassword"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              placeholder={
                lang === "ar" ? "تأكيد كلمة المرور" : "Verify password"
              }
              required
              type={showVerifyPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute inset-y-0 end-0 flex items-center px-2"
              onClick={() => setShowVerifyPassword(!showVerifyPassword)}
            >
              {showVerifyPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
      <SubmitButton className="sm:w-auto w-full">
        <LangRenderer ar="تأكيد" en="Confirm" />
      </SubmitButton>
    </Form>
  );
};

export function InputOTPPattern({
  setOtp,
  otp,
}: {
  setOtp: Dispatch<SetStateAction<string>>;
  otp: string;
}) {
  return (
    <InputOTP
      dir="ltr"
      autoFocus
      value={otp}
      onChange={(otp) => setOtp(otp)}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
    >
      <InputOTPGroup dir="ltr">
        <InputOTPSlot className=" border-foreground" index={3} />
        <InputOTPSlot className=" border-foreground" index={4} />
        <InputOTPSlot className=" border-foreground" index={5} />
      </InputOTPGroup>
      <InputOTPSeparator />

      <InputOTPGroup dir="ltr">
        <InputOTPSlot
          id="verificationCode"
          autoFocus
          className=" border-foreground"
          index={0}
        />
        <InputOTPSlot className=" border-foreground" index={1} />
        <InputOTPSlot className=" border-foreground" index={2} />
      </InputOTPGroup>
    </InputOTP>
  );
}
