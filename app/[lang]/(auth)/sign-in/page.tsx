import React from "react";
import LangRenderer from "../../components/lang";
import { SignInForm } from "../components/forms";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async ({
  searchParams,
  params: { lang },
}: {
  searchParams?: { redirect?: string };
  params: { lang: string };
}) => {
  const user = await getSession();
  const redirectLink = searchParams?.redirect;
  if (user) {
    redirect(redirectLink ?? `/${lang}`);
  }
  return (
    <div className="text-center mx-2 bg-secondary px-2 py-10 rounded-md">
      <h1 className=" font-bold text-xl">
        <LangRenderer
          ar="مرحبًا بك من جديد! سجل الدخول للمتابعة"
          en="Welcome back! Sign in to continue"
        />
      </h1>
      <br />
      <SignInForm href={redirectLink} />
    </div>
  );
};

export default page;
