"use server";

import prisma from "@/prisma/db";
import { Subscription } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const createSubscription = async ({
  subscription,
  userId,
}: {
  subscription: Omit<
    Subscription,
    "id" | "creationDate" | "renew" | "renewDate" | "valid"
  >;
  userId: string;
}): Promise<{ message: string }> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return { message: "هذا السمتخدم لم يعد متاح" };
    }
    if (user.money < subscription.price) {
      return {
        message:
          "للأسف لا تمتلك ما يكفي للإشتراك, نرجوا شحن حسابك و المحاولة ثانية",
      };
    }
    const newSubscription = await prisma.subscription.create({
      data: {
        ...subscription,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
    if (!newSubscription) {
      return { message: "حدث خطأ أثناء الاشتراك" };
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        money: {
          decrement: newSubscription.price,
        },
      },
    });
    if (!updatedUser) {
      await prisma.subscription.delete({ where: { id: newSubscription.id } });
      return { message: "حدث خطأ أثناء خصم القيمة" };
    }
    revalidateTag("subscriptions");
    revalidateTag("users");
    return {
      message:
        "تم الاشتراك في الباقة بنجاح يمكنك الان التمتع بمميزات الباقة لمدة شهر كامل",
    };
  } catch (error) {
    console.log(error);
    return { message: "حدث خطأ غير معروف الرجاء المحاولة لاحقا" };
  }
};
