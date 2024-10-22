"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/prisma/db";
import { revalidateTag, unstable_cache } from "next/cache";
import { getUserById } from "./users";

export const getVouchers = unstable_cache(
  async ({ code }: { code?: string }) => {
    try {
      const vouchers = await prisma.voucher.findMany({
        include: {
          Owner: true,
        },
        where: {
          code: {
            contains: code,
          },
        },
      });
      if (!vouchers) {
        return [];
      }
      return vouchers;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  ["vouchers"],
  { tags: ["vouchers"] }
);

export const generateVoucher = async ({
  value,
}: {
  value: number;
}): Promise<{
  message: string;
}> => {
  try {
    const user = await getSession();
    if (!user) {
      return { message: "يجب تسجيل الدخول لإكمال الإجراء" };
    }
    if (user.role !== "superAdmin") {
      return {
        message: "لا تمتلك الصلاحية لإنشاء كروت",
      };
    }
    const code = await generateUniqueVoucherCode();
    const voucher = await prisma.voucher.create({
      data: {
        code,
        creator: user.id,
        value,
      },
    });
    if (!voucher) {
      return { message: "حدث خطأ أثناء إنشاء الكرت" };
    }
    revalidateTag("vouchers");
    return {
      message: "تم إنشاء الكرت بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "حدث خطأ غير معروف الرجاء التحقق من console",
    };
  }
};

export const payVoucher = async ({ code: value }: { code: string }) => {
  try {
    const code = value.trim();
    const session = await getSession();
    if (!session) {
      return { message: "يجب تسجيل الدخول لإكمال الإجراء" };
    }
    const user = await getUserById(session.id);
    if (!user) {
      return { message: "هذا المستخدم لم يعد متاح" };
    }
    if (user.faildAttempsToChargeVoucher >= 5) {
      return {
        message:
          "لقد قمت بالعديد من المحاولات الفاشلة, يرجى التواصل مع فريق الدعم الفني",
      };
    }
    if (!code || code.length < 1) {
      return { message: "يجب توفير الكود" };
    }
    const voucher = await prisma.voucher.findUnique({ where: { code } });
    if (!voucher) {
      return { message: "لا يوجد كرت مطابق" };
    }
    if (voucher.used) {
      return { message: "هذا الكرت مستعمل بالفعل" };
    }

    const updatedVoucher = await prisma.voucher.update({
      where: { code },
      data: {
        used: true,
        Owner: {
          connect: {
            id: user.id,
          },
          update: {
            money: {
              increment: voucher.value,
            },
            faildAttempsToChargeVoucher: 0,
          },
        },
      },
    });
    if (!updatedVoucher) {
      return { message: "حدث خطأ أثناء تعبئة البطاقة, الرجاء المحاولة لاحقا" };
    }
    revalidateTag("users");
    revalidateTag("vouchers");
    return { message: "تم التعبئة بنجاح" };
  } catch (error) {
    console.log(error);
    return { message: "حدث خطأ غير معروف الرجاء المحاولة لاحقا" };
  }
};

export const deleteVoucher = async ({ code }: { code: string }) => {
  try {
    const deletedVoucher = await prisma.voucher.delete({ where: { code } });
    if (deletedVoucher) {
      revalidateTag("vouchers");
      return {
        message: "تم الحذف بنجاح",
      };
    }
    return { message: "حدث خطأ أثناء الحذف" };
  } catch (error) {
    console.log(error);
    return {
      message: "حدث خطأ غير معروف الرجاء التحقق من  console",
    };
  }
};

const generateUniqueVoucherCode = async (): Promise<string> => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?[];,./";
  const codeLength = 12; // Set the desired code length

  let code: string;
  let existingVoucher: any;

  const generateRandomCode = (): string => {
    let result = "";
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  do {
    // Generate a random code
    code = generateRandomCode();

    // Check if the code already exists in the database
    existingVoucher = await prisma.voucher.findUnique({
      where: { code },
    });

    // Continue generating a new code if the current one already exists
  } while (existingVoucher);

  return code;
};
