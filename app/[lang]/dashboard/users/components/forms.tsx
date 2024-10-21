"use client";

import AccessibleDialogForm from "@/reusable-components/accible-dialog-form";
import { User } from "@prisma/client";
import { updateUserRoleActoin } from "../actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { roleToText } from "../../components/roles";
import { useParams } from "next/navigation";
import SubmitButton from "@/reusable-components/submit-button";
import { Input } from "@/components/ui/input";
import { Lang } from "@/types";

export const UpdateUserRoleForm = ({ user }: { user: User }) => {
  const { lang }: { lang: Lang } = useParams();
  return (
    <AccessibleDialogForm
      trigger={<button>تحديث المستخدم</button>}
      action={updateUserRoleActoin}
      title="تحديث المستخدم"
    >
      <Input name="id" value={user.id} type={"hidden"} />
      <div className="flex flex-col gap-2 my-2 md:flex-row justify-between items-center">
        <Label htmlFor="role">اختيار دور جديد</Label>
        <Select
          name="role"
          dir={lang === "ar" ? "rtl" : "ltr"}
          defaultValue={user.role}
        >
          <SelectTrigger id="role" className="md:w-[180px] w-full">
            <SelectValue placeholder="الدور" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">
              {roleToText({ role: "user", lang })}
            </SelectItem>
            <SelectItem value="admin">
              {roleToText({ role: "admin", lang })}
            </SelectItem>
            <SelectItem value="superAdmin">
              {roleToText({ role: "superAdmin", lang })}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SubmitButton className="mt-4 w-fit mx-auto">تحديث</SubmitButton>
    </AccessibleDialogForm>
  );
};
