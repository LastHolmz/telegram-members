"use client";

import AccessibleDialogForm from "@/reusable-components/accible-dialog-form";
import { deleteVoucherActoin, generateVoucherActoin } from "../actions";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/reusable-components/submit-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const GenerateVoucherForm = () => {
  return (
    <AccessibleDialogForm
      trigger={<Button className=" phone-only:w-full">توليد كرت</Button>}
      action={generateVoucherActoin}
      title="توليد كرت جديد"
    >
      <div className="grid gap-2">
        <Label htmlFor="value">القيمة</Label>
        <Input
          type="number"
          name="value"
          id="value"
          required
          placeholder="ادخل قيمة الكرت هنا"
        />
      </div>
      <SubmitButton className="mt-4 phone-only:w-full">توليد</SubmitButton>
    </AccessibleDialogForm>
  );
};

export const DeleteVoucherForm = ({ code }: { code: string }) => {
  return (
    <AccessibleDialogForm
      trigger={<button>حذف الكرت</button>}
      action={deleteVoucherActoin}
      title={`حذف الكرت: ${code}`}
      description="هل أنت متأكد من حذف الكرت؟"
    >
      <Input type="hidden" name="code" value={code} />
      <SubmitButton className="mt-4 phone-only:w-full">حذف</SubmitButton>
    </AccessibleDialogForm>
  );
};
