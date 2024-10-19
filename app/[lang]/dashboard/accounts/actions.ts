import { login, sendCode } from "@/db/accounts";
import { z } from "zod";
export async function sendCodeActoin(
  prevState: {
    message: string;
    phoneCodeHash?: null | string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      phoneNumber: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      phoneNumber: formData.get("phoneNumber"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { phoneNumber } = data.data;

    const res = await sendCode(phoneNumber);
    return { message: res.message, phoneCodeHash: res.phoneCodeHash };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية", phoneCodeHash: null };
  }
}
//7c022b5a1559d78dc8

export async function loginAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      phoneCodeHash: z.string(),
      phoneNumber: z.string(),
      phoneCode: z.string(),
      password: z.string().optional().nullable(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      password: formData.get("password"),
      phoneCode: formData.get("phoneCode"),
      phoneNumber: formData.get("phoneNumber"),
      phoneCodeHash: formData.get("phoneCodeHash"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { phoneCode, phoneCodeHash, phoneNumber, password } = data.data;
    const res = await login({
      phoneCode,
      phoneCodeHash,
      phoneNumber,
      password: password === null ? undefined : password,
    });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
