"use server";

import uri from "@/lib/uri";
import { revalidateTag, unstable_cache } from "next/cache";

export const sendCode = async (phoneNumber: string) => {
  try {
    const res = await fetch(`${uri}/accounts/send-code`, {
      method: "POST",
      body: JSON.stringify({ phoneNumber }),
      headers: {
        "Content-Type": "application/json", // Add the Content-Type header
      },
    });
    const data = await res.json();
    if (data["phoneCodeHash"]) {
      return { message: "تم الطلب", phoneCodeHash: data["phoneCodeHash"] };
    }
    return { message: data["errorMessage"] as string, phoneCodeHash: null };
  } catch (error) {
    return {
      message: "couldn't connect to the server",
      phoneCodeHash: null,
    };
  }
};
export const login = async ({
  phoneCode,
  phoneCodeHash,
  phoneNumber,
  password,
}: {
  phoneNumber: string;
  phoneCode: string;
  phoneCodeHash: string;
  password?: string;
}) => {
  try {
    const res = await fetch(`${uri}/accounts/create-acc`, {
      method: "POST",
      body: JSON.stringify({
        phoneCode,
        phoneCodeHash,
        phoneNumber,
        password,
      }),
      headers: {
        "Content-Type": "application/json", // Add the Content-Type header
      },
    });
    const data = await res.json();
    console.log(data);
    if (data["message"]) {
      revalidateTag("accounts");
      return { message: data["message"] };
    }

    return { message: data["errorMessage"] as string, phoneCodeHash: "0" };
  } catch (error) {
    return {
      message: "couldn't connect to the server",
      phoneCodeHash: null,
    };
  }
};

export const getAccounts = unstable_cache(
  async ({
    phoneNumber,
    userId,
  }: {
    phoneNumber?: string;
    userId?: string;
  }) => {
    // console.log("calling get acc");
    // console.log(
    //   `${uri}/accounts?${phoneNumber ? `phoneNumber=${phoneNumber}` : ""}&${
    //     userId ? `userId=${userId}` : ""
    //   }`
    // );
    try {
      const res = await fetch(
        `${uri}/accounts?${phoneNumber && `phoneNumber=${phoneNumber}`}&${
          userId && `userId=${userId}`
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Add the Content-Type header
          },
        }
      );
      const data: { data: TelegramAccount[] } = await res.json();
      if (data.data) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  ["accounts"],
  { tags: ["accounts"] }
);
