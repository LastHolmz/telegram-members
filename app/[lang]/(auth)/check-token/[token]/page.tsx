import LangRenderer from "@/app/[lang]/components/lang";
import { decrypt, encrypt, handleSetCookie, setCookie } from "@/lib/auth";
import prisma from "@/prisma/db";
import { UserSession } from "@/types";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ResetPasswordForm } from "../../components/forms";

const page = async ({
  params: { token, lang },
}: {
  params: { token: string; lang: string };
}) => {
  // Redirect if no token is provided
  if (!token) {
    redirect("/");
  }

  // Fetch the session using the recovery token
  const session = await prisma.session.findFirst({
    where: { recoveryToken: token },
  });

  // Redirect if no session found for the token
  if (!session) {
    redirect(`/${lang}/recovery-password`);
  }

  // Check if the recovery token has expired
  const currentTime = new Date();
  if (session.recoveryTokenExpires < currentTime) {
    // Redirect if the token has expired
    redirect(`/${lang}/recovery-password`);
  }

  const decryptedToken: UserSession | null = await decrypt(
    session.recoveryToken
  );
  if (!decryptedToken) {
    redirect(`/${lang}/recovery-password`);
  }

  return (
    <div>
      <Suspense
        fallback={
          <>
            {" "}
            <LangRenderer ar="جاري التحقق..." en="Checking..." />
          </>
        }
      >
        <div className="text-center mx-2 bg-secondary px-2 py-10 rounded-md">
          <h1 className=" font-bold text-xl">
            <LangRenderer
              ar="أهلًا بك! أنشئ حسابًا جديدًا للانضمام"
              en="Hello! Create a new account to join"
            />
          </h1>
          <br />
          <ResetPasswordForm email={decryptedToken.email} />
        </div>
      </Suspense>
    </div>
  );
};

export default page;
