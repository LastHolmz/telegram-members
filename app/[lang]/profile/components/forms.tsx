"use client";

import AccessibleDialogForm from "@/reusable-components/accible-dialog-form";
import { payVoucherActoin } from "../actions";
import SubmitButton from "@/reusable-components/submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const PayVoucherForm = () => {
  return (
    <AccessibleDialogForm
      trigger={<Button>تعبئة الكرت</Button>}
      action={payVoucherActoin}
      title={`تعبئة الكرت`}
      description="هل أنت متأكد من تعبئة الكرت؟"
    >
      <div className="grid gap-2">
        <Label htmlFor="code">القيمة</Label>
        <Input
          type="string"
          name="code"
          id="code"
          required
          placeholder="ادخل قيمة الكرت هنا"
        />
      </div>{" "}
      <SubmitButton className="mt-4 phone-only:w-full">تعبئة</SubmitButton>
    </AccessibleDialogForm>
  );
};
