"use client";
import { deleteAccountAction, loginAction, sendCodeActoin } from "../actions";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/reusable-components/submit-button";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useParams, useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FaArrowRight } from "react-icons/fa";
import { CustomLink } from "@/components/ui/custom-link";
import AccessibleDialogForm from "@/reusable-components/accible-dialog-form";
import { TelegramAccount } from "@prisma/client";
import LangRenderer from "@/app/[lang]/components/lang";

export function InputOTPPattern({
  setValue,
  value,
}: {
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
}) {
  return (
    <InputOTP
      value={value}
      onChange={(value) => setValue(value)}
      maxLength={5}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
    >
      <InputOTPGroup>
        <InputOTPSlot className=" border-foreground" index={0} />
        <InputOTPSlot className=" border-foreground" index={1} />
        <InputOTPSlot className=" border-foreground" index={2} />
        <InputOTPSlot className=" border-foreground" index={3} />
        <InputOTPSlot className=" border-foreground" index={4} />
      </InputOTPGroup>
    </InputOTP>
  );
}

const initState = {
  message: "",
  phoneCodeHash: "",
};

export const SendCodeForm = ({ ownerId }: { ownerId: string }) => {
  const [content, dispatch] = useFormState(sendCodeActoin, initState);
  const [PassContent, PassDispatch] = useFormState(loginAction, initState);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCodeHash, setPhoneCodeHash] = useState<string | null | undefined>(
    ""
  );
  const [needPassword, setNeedPassword] = useState(false);
  const [otp, setOtp] = useState("");

  const [changeState, setChangeState] = useState(false);
  const router = useRouter();
  const { lang } = useParams();

  const translations = {
    en: {
      phoneInputLabel: "Enter your phone number",
      submitOtpButton: "Login",
      requestCodeButton: "Request verification code",
      passwordLabel: "Password",
      loginButton: "Login",
    },
    ar: {
      phoneInputLabel: "ادخل رقمك",
      submitOtpButton: "تسجيل الدخول",
      requestCodeButton: "طلب رمز التحقق",
      passwordLabel: "كلمة السر",
      loginButton: "تسجيل الدخول",
    },
  };

  const t = lang === "ar" ? translations.ar : translations.en;

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  useEffect(() => {
    if (!content.message) return;
    toast({
      title:
        phoneCodeHash && phoneCodeHash.length > 1
          ? PassContent.message
          : content.message,
    });
    if (content.phoneCodeHash) {
      setPhoneCodeHash(content.phoneCodeHash);
    }
    console.log(content.message);
    if (PassContent.message === `logged`) {
      router.push(`/${lang}/profile/accounts`);
    }
    if (PassContent.message === `SESSION_PASSWORD_NEEDED`) {
      setNeedPassword(true);
    }
  }, [content, phoneCodeHash, needPassword, changeState, PassContent]);

  return (
    <div className="w-full h-full bg-secondary relative px-4 py-10 rounded-md min-h-72 flex flex-col justify-center items-center">
      {phoneCodeHash && phoneCodeHash.length > 0 && (
        <CustomLink
          href={`/${lang}/profile/accounts`}
          variant={"outline"}
          size={"icon"}
          className="absolute z-50 right-2 top-2"
        >
          <FaArrowRight />
        </CustomLink>
      )}

      {phoneCodeHash && phoneCodeHash.length > 1
        ? !needPassword && (
            <div dir="ltr">
              <form action={PassDispatch} className="grid gap-2">
                <InputOTPPattern value={otp} setValue={setOtp} />
                <SubmitButton
                  onClick={() => {
                    setChangeState(!changeState);
                    // console.log(content.message);
                    // console.log(changeState);
                  }}
                >
                  {t.submitOtpButton}
                </SubmitButton>
                <Input type={"hidden"} name="ownerId" value={ownerId} />
                <Input type={"hidden"} name="phoneCode" value={otp} />
                <Input
                  type={"hidden"}
                  name="phoneCodeHash"
                  value={phoneCodeHash ?? undefined}
                />
                <Input type={"hidden"} name="phoneNumber" value={phoneNumber} />
              </form>
            </div>
          )
        : !needPassword && (
            <div>
              <form action={dispatch}>
                <div>
                  <Label>{t.phoneInputLabel}</Label>
                  <CustomPhoneInput
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                  />
                  <Input type="hidden" name="phoneNumber" value={phoneNumber} />
                </div>
                <SubmitButton>{t.requestCodeButton}</SubmitButton>
              </form>
            </div>
          )}
      {needPassword && (
        <div>
          <form action={PassDispatch}>
            <Input type={"hidden"} name="ownerId" value={ownerId} />

            <Label htmlFor="password">{t.passwordLabel}</Label>
            <Input type="password" name="password" id="password" />
            <SubmitButton>{t.loginButton}</SubmitButton>
            <Input type={"hidden"} name="phoneCode" value={otp} />
            <Input
              type={"hidden"}
              name="phoneCodeHash"
              value={phoneCodeHash ?? undefined}
            />
            <Input type={"hidden"} name="phoneNumber" value={phoneNumber} />
          </form>
        </div>
      )}
      <span className="my-2 text-sm">
        {phoneCodeHash && phoneCodeHash.length > 1
          ? PassContent.message
          : content.message}
      </span>
    </div>
  );
};

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  return (
    <div dir="ltr" className="flex w-full my-2 justify-center items-center">
      <PhoneInput
        country={"ly"}
        value={value}
        onChange={onChange}
        isValid
        inputClass="block w-[100%] px-4 py-2  border-gray-300 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm max-w-full"
        buttonClass="px-4 py-2 text-black"
        dropdownClass="border border-gray-300 text-black rounded-md shadow-md"
        countryCodeEditable={false}
      />
    </div>
  );
};

export const DeleteAccountForm = ({
  account,
}: {
  account: TelegramAccount;
}) => {
  const translations = {
    en: {
      trigger: "Logout",
      title: `Logout ${account.phoneNumber}`,
      description:
        "Are you sure you want to log out? You won't be able to access this account until you log in again.",
      submitButton: "Logout",
    },
    ar: {
      trigger: "تسجيل الخروج",
      title: `تسجيل الخروج ${account.phoneNumber}`,
      description:
        "هل انت متأكد من تسجيل الخروج, لا يمكنك العودة الى الحساب حتى تجيل الدخول ثانية",
      submitButton: "تسجيل الخروج",
    },
  };
  const { lang } = useParams();
  return (
    <AccessibleDialogForm
      action={deleteAccountAction}
      trigger={
        <button>
          {" "}
          <LangRenderer
            ar={translations.ar.trigger}
            en={translations.en.trigger}
          />
        </button>
      }
      title={`${
        lang === "ar" ? translations.ar.title : translations.en.title
      } ${account.phoneNumber}`}
      description={
        lang === "ar"
          ? translations.ar.description
          : translations.ar.description
      }
    >
      <Input type={"hidden"} name="id" value={account.id} />
      <SubmitButton>
        <LangRenderer
          ar={translations.ar.submitButton}
          en={translations.en.submitButton}
        />
      </SubmitButton>
    </AccessibleDialogForm>
  );
};
