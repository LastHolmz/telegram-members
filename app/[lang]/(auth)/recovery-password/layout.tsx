import React, { ReactNode } from "react";
import LangRenderer from "../../components/lang";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-center mx-2 bg-secondary px-2 py-10 rounded-md">
      <h1 className=" font-bold text-xl">
        <LangRenderer
          ar="أهلًا بك! استعد كلمة المرور الخاصة بك للمتابعة"
          en="Hello! Recover your password to continue"
        />
      </h1>
      <br />
      {children}
    </div>
  );
};

export default layout;
