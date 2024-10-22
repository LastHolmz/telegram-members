import { deleteVoucher, generateVoucher } from "@/db/vouchers";
import { z } from "zod";

export async function generateVoucherActoin(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      value: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      value: formData.get("value"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { value } = data.data;

    const res = await generateVoucher({ value: Number(value) });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
export async function deleteVoucherActoin(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      code: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      code: formData.get("code"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { code } = data.data;

    const res = await deleteVoucher({ code });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
