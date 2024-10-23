import { cancelSubscription } from "@/db/subscriptions";
import { payVoucher } from "@/db/vouchers";
import { z } from "zod";
export async function payVoucherActoin(
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

    const res = await payVoucher({ code });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
export async function cancelSubscriptionActoin(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      subscriptionId: z.string(),
      userId: z.string(),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      userId: formData.get("userId"),
      subscriptionId: formData.get("subscriptionId"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { subscriptionId, userId } = data.data;

    const res = await cancelSubscription({ subscriptionId, userId });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
