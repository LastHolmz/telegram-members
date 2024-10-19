"use client";
import { loginAction, sendCodeActoin } from "../actions";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/reusable-components/submit-button";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Form from "@/reusable-components/form";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { CustomLink } from "@/components/ui/custom-link";

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
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
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

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  useEffect(() => {
    if (!content.message) return;
    toast({ title: content.message });
    if (content.phoneCodeHash) {
      setPhoneCodeHash(content.phoneCodeHash);
    }
    console.log(content.message);
    if (PassContent.message === `SESSION_PASSWORD_NEEDED`) {
      setNeedPassword(true);
    }
  }, [content, phoneCodeHash, needPassword, changeState, PassContent]);

  return (
    <div className="w-full h-full bg-secondary relative px-4 py-10 rounded-md min-h-72 flex  flex-col justify-center items-center">
      {phoneCodeHash && phoneCodeHash.length > 0 && (
        <CustomLink
          href="/dashboard/accounts"
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
                  onClick={(e) => {
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
      <span className="my-2 text-sm">{content.message}</span>
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
