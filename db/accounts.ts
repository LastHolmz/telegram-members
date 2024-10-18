"use server";

export const sendCode = async (phoneNumber: string) => {
  try {
    const res = await fetch("http://localhost:8080/api/v1/accounts/send-code", {
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
    const res = await fetch(
      "http://localhost:8080/api/v1/accounts/create-acc",
      {
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
      }
    );
    const data = await res.json();
    if (data["message"]) {
      return { message: data["message"] };
    }
    return { message: data["errorMessage"] as string, phoneCodeHash: null };
  } catch (error) {
    return {
      message: "couldn't connect to the server",
      phoneCodeHash: null,
    };
  }
};
