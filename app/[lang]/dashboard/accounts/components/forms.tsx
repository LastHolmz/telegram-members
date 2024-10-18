"use client";
import { loginAction, sendCodeActoin } from "../actions";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
// import Stepper from "awesome-react-stepper";
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

export function InputOTPPattern() {
  const [value, setValue] = useState("");

  return (
    <>
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
          {/* <InputOTPSlot index={5} /> */}
        </InputOTPGroup>
      </InputOTP>
      <Input type={"hidden"} name="phoneCode" value={value} />
    </>
  );
}

const initState = {
  message: "",
  phoneCodeHash: null,
};
export const SendCodeForm = () => {
  const [content, dispatch] = useFormState(sendCodeActoin, initState);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCodeHash, setPhoneCodeHash] = useState<string | null | undefined>(
    undefined
  );
  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  useEffect(() => {
    if (!content.message) return;
    toast({ title: content.message });
    if (content.phoneCodeHash) {
      setPhoneCodeHash(content.phoneCodeHash);
    }
  }, [content, phoneCodeHash]);
  console.log(typeof phoneCodeHash);

  return (
    <div className=" bg-secondary px-2 w-full h-full">
      <div>
        <form action={dispatch}>
          <div>
            <Label>
              ادخل رقمك
              <CustomPhoneInput
                value={phoneNumber}
                onChange={handlePhoneChange}
              />
            </Label>
            <Input type="hidden" name="phoneNumber" value={phoneNumber} />
          </div>
          <SubmitButton>طلب رمز التحقق</SubmitButton>
        </form>{" "}
      </div>
      {typeof phoneCodeHash === "string" && (
        <div>
          <Form action={loginAction} dontReplace>
            <InputOTPPattern />
            <SubmitButton>تسجيل الدخول</SubmitButton>
            <Input
              type={"hidden"}
              name="phoneCodeHash"
              value={phoneCodeHash ?? undefined}
            />
            <Input type={"hidden"} name="phoneNumber" value={phoneNumber} />
          </Form>
        </div>
      )}
    </div>
  );
};

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomPhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  return (
    <div dir="ltr" className=" flex w-full justify-center items-center">
      <PhoneInput
        country={"ly"} // Set default country
        value={value}
        onChange={onChange}
        isValid
        // enableSearch={true}
        inputClass="block w-full px-4 py-2  border-gray-300 text-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        buttonClass="px-4 py-2"
        dropdownClass="border border-gray-300 rounded-md shadow-md"
        countryCodeEditable={false} // Disable country code editing
      />
    </div>
  );
};

{
  /*  
  id       String  @id @default(auto()) @map("_id") @db.ObjectId
  accId    Int     @unique
  session  String
  username String?
  ownerId  String  @default("me")
  phoneNumber String
   */
}
