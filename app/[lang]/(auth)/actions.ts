import { createUser, login, recoverPassword, verifyUser } from "@/db/users";
import { z } from "zod";

export async function createUserAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // Schema for validating the incoming form data
    const schema = z.object({
      email: z.string().email("البريد الإلكتروني غير صالح"), // "Invalid email"
      fullName: z.string().min(1, "الاسم الكامل مطلوب"), // "Full name is required"
      phoneNumber: z.string().min(1, "رقم الهاتف مطلوب"), // "Phone number is required"
      password: z.string().min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل"), // "Password must be at least 6 characters"
      // role: roleEnum, // Uncomment if you need to handle roles
    });

    // Parsing and validating the data
    const data = schema.safeParse({
      email: formData.get("email"),
      fullName: formData.get("fullName"),
      phoneNumber: formData.get("phoneNumber"),
      password: formData.get("password"),
      // role: formData.get("role"),
    });

    if (!data.success) {
      // Return validation error messages
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { email, fullName, phoneNumber, password } = data.data;

    // Attempt to create the user
    const res = await createUser({
      user: {
        email,
        fullName,
        password,
        role: "user", // Assign a default role
        phoneNumber: Number(phoneNumber), // Ensure phone number is a number
      },
    });

    // Return the message from the createUser function
    return { message: res.message };
  } catch (error) {
    console.error(error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later"
  }
}
export async function loginUserAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // Schema for validating the incoming form data
    const schema = z.object({
      email: z.string().email("البريد الإلكتروني غير صالح"), // "Invalid email"
      password: z.string().min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل"), // "Password must be at least 6 characters"
      // role: roleEnum, // Uncomment if you need to handle roles
    });

    // Parsing and validating the data
    const data = schema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      // role: formData.get("role"),
    });

    if (!data.success) {
      // Return validation error messages
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { email, password } = data.data;

    // Attempt to create the user
    const res = await login({
      user: {
        email,
        password,
      },
    });

    // Return the message from the createUser function
    return { message: res.message };
  } catch (error) {
    console.error(error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later"
  }
}

export async function verifyUserAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // Schema for validating the incoming form data
    const schema = z.object({
      verificationCode: z.string().length(6, "يجب أن يكون رمز التحقق 6 أرقام"), // "Verification code must be 6 digits"
      id: z.string(), // "Invalid user ID"
    });

    // Parsing and validating the data
    const data = schema.safeParse({
      verificationCode: formData.get("verificationCode"),
      id: formData.get("id"),
    });

    if (!data.success) {
      // Return validation error messages
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { verificationCode, id } = data.data;

    // Attempt to verify the user
    const res = await verifyUser({
      id,
      verificaionCode: Number(verificationCode), // Convert to number
    });

    // Return the message from the verifyUser function
    return { message: res.message };
  } catch (error) {
    console.error(error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later"
  }
}
export async function recoverPasswordAction(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    // Schema for validating the incoming form data
    const schema = z.object({
      email: z.string().email("يرجى إدخال بريد إلكتروني صالح"), // "Please enter a valid email address"
    });

    // Parsing and validating the data
    const data = schema.safeParse({
      email: formData.get("email"),
    });

    if (!data.success) {
      // Return validation error messages
      return {
        message: data.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { email } = data.data;

    // Attempt to recover the password
    const res = await recoverPassword({ email });

    // Return the message from the recoverPassword function
    return { message: res.message };
  } catch (error) {
    console.error(error);
    return { message: "فشلت العملية، يرجى المحاولة لاحقاً" }; // "The operation failed, please try again later"
  }
}
