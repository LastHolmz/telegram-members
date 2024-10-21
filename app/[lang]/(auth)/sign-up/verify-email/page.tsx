import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { VerifyEmailForm } from "../../components/forms";
import { Lang } from "@/types";

const page = async ({ params: { lang } }: { params: { lang: Lang } }) => {
  const user = await getSession();
  if (!user) {
    redirect(`/${lang}/sign-up`);
  }
  if (user.verified) {
    // redirect(`/${lang}`);
  }
  return (
    <div>
      <VerifyEmailForm id={user.id} />
    </div>
  );
};

export default page;
