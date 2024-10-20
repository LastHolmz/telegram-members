import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { env } from "process";
import React from "react";
import { VerifyUserForm } from "../../components/forms";

const page = async () => {
  const user = await getSession();
  if (!user) {
    redirect("/sign-up");
  }
  return (
    <div>
      <VerifyUserForm id={user.id} />
    </div>
  );
};

export default page;
