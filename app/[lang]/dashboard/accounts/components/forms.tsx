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
export const SendCodeForm = () => {
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
      router.push(`/${lang}/dashboard/accounts`);
    }
    if (PassContent.message === `SESSION_PASSWORD_NEEDED`) {
      setNeedPassword(true);
    }
  }, [content, phoneCodeHash, needPassword, changeState, PassContent]);

  return (
    <div className="w-full h-full bg-secondary relative px-4 py-10 rounded-md min-h-72 flex  flex-col justify-center items-center">
      {phoneCodeHash && phoneCodeHash.length > 0 && (
        <CustomLink
          href={`/${lang}/dashboard/accounts`}
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
              <form action={PassDispatch} className=" grid gap-2">
                <InputOTPPattern value={otp} setValue={setOtp} />
                <SubmitButton
                  onClick={() => {
                    // e.preventDefault();
                    setChangeState(!changeState);
                    console.log(content.message);
                    console.log(changeState);
                  }}
                >
                  تسجيل الدخول
                </SubmitButton>
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
                  <Label>ادخل رقمك</Label>
                  <CustomPhoneInput
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                  />
                  <Input type="hidden" name="phoneNumber" value={phoneNumber} />
                </div>
                <SubmitButton>طلب رمز التحقق</SubmitButton>
              </form>
            </div>
          )}
      {needPassword && (
        <div>
          <form action={PassDispatch}>
            <Label htmlFor="password">كلمة السر</Label>
            <Input type="password" name="password" id="password" />
            <SubmitButton>تسجيل الدخول</SubmitButton>
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
      {/* <span className="my-2 text-sm">{content.message}</span> */}
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
  return (
    <AccessibleDialogForm
      action={deleteAccountAction}
      trigger={<button>تسجيل الخروج</button>}
      title={`تسجيل الخروج ${account.phoneNumber}`}
      description="هل انت متأكد من تسجيل الخروج, لا يمكنك العودة الى الحساب حتى تجيل الدخول ثانية"
    >
      <Input type={"hidden"} name="id" value={account.id} />
      <SubmitButton>تسجيل الخروج</SubmitButton>
    </AccessibleDialogForm>
  );
};
