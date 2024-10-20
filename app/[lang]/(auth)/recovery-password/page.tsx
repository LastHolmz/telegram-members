import LangRenderer from "../../components/lang";
import { RecoverPasswordForm } from "../components/forms";

const page = ({ searchParams }: { searchParams?: { sentToken?: string } }) => {
  return (
    <div className="text-center mx-2 bg-secondary px-2 py-10 rounded-md">
      <h1 className="font-bold text-xl">
        <LangRenderer
          ar="أهلًا بك! استعد كلمة المرور الخاصة بك."
          en="Hello! Recover your password."
        />
      </h1>

      <br />
      <div className="mx-auto w-full">
        <RecoverPasswordForm>
          {searchParams?.sentToken === "true" &&
            "تم الإرسال بنجاح. تحقق من بريدك الإلكتروني."}
        </RecoverPasswordForm>
      </div>
    </div>
  );
};

export default page;
