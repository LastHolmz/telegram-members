import { getAccounts } from "@/db/accounts";
import { SendCodeForm } from "../components/forms";

const page = async () => {
  //   const accounts = await getAccounts();
  //   console.log(accounts);
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
