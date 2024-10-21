"use server";
import bcryptjs from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UserSession } from "@/types";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export const hashPassword = async (password: string) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hash(password, salt);
  return hash;
};

export const checkPassword = async (
  password: string,
  hashedPassword: string
) => {
  const validPassword = await bcryptjs.compare(password, hashedPassword);
  return validPassword;
};

export const setCookie = async (session: string, expires: Date) => {
  const isProduction = process.env.NODE_ENV === "production";
  cookies().set("session", session, {
    expires,
    httpOnly: true,
    secure: isProduction,
  });
};

//encryt our token
export const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 days from now")
    .sign(key);
};

// decrypt our token
export const decrypt = async (input: string): Promise<any> => {
  // console.log(key);
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
};

/**
 * Fetches the current user session from the server.
 * @returns {Promise<UserSession | null>} A promise that resolves to the user session or null if no session exists.
 */
export const getSession = async (): Promise<UserSession | null> => {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
};

export const updateSession = async (request: NextRequest) => {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
};

export const logout = async () => {
  // Destroy the session
  try {
    cookies().set("session", "", { expires: new Date(0) });
    // revalidatePath("/");
    return { message: "تم تسجيل الخروج بنجاح" };
  } catch (error) {
    return { message: "حدث خطأ أثناء تسجيل الخروج" };
  }
};
