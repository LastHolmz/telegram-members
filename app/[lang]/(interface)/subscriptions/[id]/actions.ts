import { createSubscription } from "@/db/subscriptions";
import { z } from "zod";

export async function subscribeAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // Schema for validating the incoming form data
    const schema = z.object({
      price: z.string(),
      allowedAccounts: z.string(),
      type: z.enum(["basic", "sponsered", "premium"]),
      userId: z.string(), // "InvaluserId user userId"
    });

    // Parsing and valuserIdating the data
    const data = schema.safeParse({
      price: formData.get("price"),
      allowedAccounts: formData.get("allowedAccounts"),
      type: formData.get("type"),
      userId: formData.get("userId"),
    });

    if (!data.success) {
      // Return valuserIdation error messages
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { userId, price, allowedAccounts, type } = data.data;

    // Attempt to verify the user
    const res = await createSubscription({
      subscription: {
        allowedAccounts: Number(allowedAccounts),
        price: Number(price),
        type,
      },
      userId,
    });

    // Return the message from the verifyUser function
    return { message: res.message };
  } catch (error) {
    console.error(error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later"
  }
}
