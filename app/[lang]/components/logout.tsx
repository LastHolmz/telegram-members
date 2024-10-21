"use client";

import AccessibleDialogForm from "@/reusable-components/accible-dialog-form";
import { logoutAction } from "../(auth)/actions";
import { ReactNode } from "react";
import { useParams } from "next/navigation";
import SubmitButton from "@/reusable-components/submit-button";

const LogoutForm = ({ children }: { children: ReactNode }) => {
  const { lang } = useParams();
  return (
    <AccessibleDialogForm
      action={logoutAction}
      trigger={children}
      title={lang === "ar" ? "هل أنت متأكد من تسجيل الخروج" : "Are you sure"}
    >
      <SubmitButton>نعم</SubmitButton>
    </AccessibleDialogForm>
  );
};

export default LogoutForm;
