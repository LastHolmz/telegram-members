import React from "react";
import { SendCodeForm } from "./components/forms";

const page = () => {
  return (
    <main
      dir="rtl"
      className=" flex justify-center items-center h-screen w-full"
    >
      <div className=" w-full container">
        <SendCodeForm />
      </div>
    </main>
  );
};

export default page;
