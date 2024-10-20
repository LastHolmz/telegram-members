"use server";

import prisma from "@/prisma/db";
import { User } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { sendMail } from "../lib/mail";
import { checkPassword, encrypt, hashPassword, setCookie } from "@/lib/auth";

export const createUser = async ({
  user: { email, fullName, phoneNumber, password, role },
}: {
  user: Omit<User, "id" | "verified" | "verifyingCode">;
}) => {
  try {
    const hashedPassword = await hashPassword(password);
    const verifyingCode = generateRandomSixDigitNumber();
    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        phoneNumber,
        verifyingCode,
        role,
        password: hashedPassword,
      },
    });
    if (!newUser) {
      return { message: "فشل إنشاء الحساب" };
    }
    await sendMail({
      to: email,
      body: `
      <html>
      <head>
          <title>TEME Verification Code</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                  color: #333;
              }
              .container {
                  background-color: #fff;
                  border-radius: 8px;
                  padding: 20px;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                  max-width: 600px;
                  margin: auto;
              }
              h1 {
                  color: #007bff;
              }
              code {
                  font-size: 24px;
                  font-weight: bold;
                  background-color: #e9ecef;
                  padding: 10px;
                  border-radius: 5px;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 14px;
                  color: #666;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome to TEME!</h1>
              <p>Thank you for creating an account with us. To complete your registration, please use the following verification code:</p>
              <code>${verifyingCode}</code>
              <p>If you didn’t create this account, please ignore this email.</p>
              <div class="footer">
                  <p>Best Regards,</p>
                  <p>The TEME Team</p>
              </div>
          </div>
      </body>
      </html>
      `,
      name: "TEME Verification",
      subject: "Verification Code to Verify Your Email",
    });

    // Create the session
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const session = await encrypt({
      ...{
        id: newUser.id,
        fullName: newUser.fullName,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
        verified: newUser.verified,
      },
      expires,
    });
    // Save the session in a cookie
    setCookie(session, expires);
    revalidateTag("users");
    return { message: "يرجى تأكيد الحساب" };
  } catch (error) {
    console.log(error);
    return { message: "فشل إنشاء الحساب, يرجى المحاولة لاحقا" };
  }
};

export const login = async ({
  user: { email, password },
}: {
  user: Omit<
    User,
    "id" | "verified" | "verifyingCode" | "role" | "phoneNumber" | "fullName"
  >;
}) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { message: "لم يتم العثور على حساب بهذا البريد الإلكتروني." }; // "No account found with this email."
    }
    const passwordMatch = await checkPassword(password, user.password ?? "");

    if (!passwordMatch) {
      return { message: "كلمة المرور غير صحيحة. الرجاء المحاولة مرة أخرى." }; // "Incorrect password. Please try again."
    }

    await sendMail({
      to: email,
      body: `
      <html>
      <head>
          <title>Welcome to TEME!</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  padding: 20px;
                  color: #444;
              }
              .container {
                  background-color: #ffffff;
                  border-radius: 8px;
                  padding: 20px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  max-width: 600px;
                  margin: auto;
              }
              h1 {
                  color: #0056b3;
              }
              .footer {
                  margin-top: 30px;
                  font-size: 12px;
                  color: #888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome back to TEME!</h1>
              <p>You have successfully logged in to your account. We're glad to see you again!</p>
              <p>If this login wasn't made by you, please contact our support team immediately.</p>
              <div class="footer">
                  <p>Best regards,</p>
                  <p>The TEME Team</p>
              </div>
          </div>
      </body>
      </html>
      `,
      name: "TEME Login Notification",
      subject: "Successful Login to Your TEME Account",
    });

    // Create the session
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const session = await encrypt({
      ...{
        id: user.id,
        fullName: user.fullName,
        role: user.role,
        phoneNumber: user.phoneNumber,
        verified: user.verified,
      },
      expires,
    });
    // Save the session in a cookie
    setCookie(session, expires);
    revalidateTag("users");
    return { message: "تم تسجيل الدخول بنجاح." }; // "Login successful."
  } catch (error) {
    console.log(error);
    return { message: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقاً." }; // "An error occurred during login. Please try again later."
  }
};

export const verifyUser = async ({
  id,
  verificaionCode,
}: {
  verificaionCode: number;
  id: string;
}) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return {
        message: "لم يتم العثور على المستخدم",
      };
    }
    if (user.verifyingCode !== verificaionCode) {
      return { message: "رمز التحقق غير صحيح" };
    }
    const newUser = await prisma.user.update({
      where: { id },
      data: {
        verified: true,
      },
    });
    if (!newUser) {
      return { message: "فشل تأكيد الحساب" };
    }
    await sendMail({
      to: user.email,
      body: `
      <html>
      <head>
          <title>TEME Account Verification Successful</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                  color: #333;
              }
              .container {
                  background-color: #fff;
                  border-radius: 8px;
                  padding: 20px;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                  max-width: 600px;
                  margin: auto;
              }
              h1 {
                  color: #28a745;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 14px;
                  color: #666;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Account Verified Successfully!</h1>
              <p>Your account has been confirmed successfully. Thank you for using TEME!</p>
              <p>If you have any questions or need assistance, feel free to contact us.</p>
              <div class="footer">
                  <p>Best Regards,</p>
                  <p>The TEME Team</p>
              </div>
          </div>
      </body>
      </html>
      `,
      name: "Verification Successful",
      subject: "Your Account Was Successfully Verified",
    });

    // Create the session
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const session = await encrypt({
      ...{
        id: newUser.id,
        fullName: newUser.fullName,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
        verified: newUser.verified,
      },
      expires,
    });
    // Save the session in a cookie
    setCookie(session, expires);
    revalidateTag("users");
    return { message: "تم تأكيد الحساب" };
  } catch (error) {
    console.log(error);
    return { message: "فشل إنشاء الحساب, يرجى المحاولة لاحقا" };
  }
};

export const recoverPassword = async ({ email }: { email: string }) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { message: "لم يتم العثور على حساب بهذا البريد الإلكتروني." }; // "No account found with this email."
    }

    // Generate a unique verification code
    const verifyingCode = generateRandomSixDigitNumber();

    // Update the user record with the verification code
    await prisma.user.update({
      where: { email },
      data: {
        verifyingCode,
      },
    });

    // Send the recovery email
    await sendMail({
      to: email,
      body: `
      <html>
      <head>
          <title>Password Recovery</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  padding: 20px;
                  color: #444;
              }
              .container {
                  background-color: #ffffff;
                  border-radius: 8px;
                  padding: 20px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  max-width: 600px;
                  margin: auto;
              }
              h1 {
                  color: #d9534f;
              }
              code {
                  display: block;
                  margin: 20px 0;
                  font-size: 24px;
                  font-weight: bold;
                  background-color: #e9ecef;
                  padding: 10px;
                  border-radius: 5px;
                  text-align: center;
                  color: #333;
              }
              .footer {
                  margin-top: 30px;
                  font-size: 12px;
                  color: #888;
                  text-align: center;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>طلب استعادة كلمة المرور</h1>
              <p>لقد تلقينا طلباً لاستعادة كلمة المرور الخاصة بك. يرجى استخدام الرمز التالي لإعادة تعيين كلمة المرور:</p>
              <code>${verifyingCode}</code>
              <p>هذا الرمز صالح لمدة ساعة واحدة. إذا لم تطلب استعادة كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني.</p>
              <div class="footer">
                  <p>مع تحيات،</p>
                  <p>فريق TEME</p>
              </div>
          </div>
      </body>
      </html>
      `,
      name: "TEME Password Recovery",
      subject: "طلب استعادة كلمة المرور", // "Password Recovery Request"
    });

    return {
      message: "تم إرسال تعليمات استعادة كلمة المرور إلى بريدك الإلكتروني",
    }; // "Password recovery instructions sent to your email."
  } catch (error) {
    console.log(error);
    return {
      message: "حدث خطأ أثناء استعادة كلمة المرور. يرجى المحاولة لاحقاً.",
    }; // "An error occurred during password recovery. Please try again later."
  }
};

function generateRandomSixDigitNumber(): number {
  // Generate the first digit (1-9)
  const firstDigit = Math.floor(Math.random() * 9) + 1;

  // Generate the remaining five digits (0-9)
  const remainingDigits = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  // Combine first digit and remaining digits
  const randomNumber = `${firstDigit}${remainingDigits}`;

  return parseInt(randomNumber, 10); // Convert string to number
}
