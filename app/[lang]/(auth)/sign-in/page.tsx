import React, { ReactNode } from "react";
import LangRenderer from "../../components/lang";
import { SignInForm } from "../components/forms";

const page = () => {
  return (
    <div className="text-center mx-2 bg-secondary px-2 py-10 rounded-md">
      <h1 className=" font-bold text-xl">
        <LangRenderer
          ar="مرحبًا بك من جديد! سجل الدخول للمتابعة"
          en="Welcome back! Sign in to continue"
        />
      </h1>
      <br />
      <SignInForm />
    </div>
  );
};

export default page;
