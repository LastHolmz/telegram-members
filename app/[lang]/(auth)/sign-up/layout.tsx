import React, { ReactNode } from "react";
import LangRenderer from "../../components/lang";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-center mx-2 bg-secondary px-2 py-10 rounded-md">
      <h1 className=" font-bold text-xl">
        <LangRenderer
          ar="أهلًا بك! أنشئ حسابًا جديدًا للانضمام"
          en="Hello! Create a new account to join"
        />
      </h1>
      <br />
      {children}
    </div>
  );
};

export default layout;
