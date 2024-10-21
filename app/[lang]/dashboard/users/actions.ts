import { updateUserRole } from "@/db/users";
import { z } from "zod";
export async function updateUserRoleActoin(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  try {
    const schema = z.object({
      id: z.string(),
      role: z.enum(["admin", "superAdmin", "user"]),
    });
    console.log(`schema: ${schema}`);

    const data = schema.safeParse({
      role: formData.get("role"),
      id: formData.get("id"),
    });
    console.log(data);

    console.log(data.success);
    if (!data.success) {
      return { message: "يجب أن يتم ملء جميع الحقول" };
    }
    console.log(data);
    const { id, role } = data.data;

    const res = await updateUserRole({ id, role });
    return { message: res.message };
  } catch (e) {
    console.log(e);
    return { message: "فشلت العملية" };
  }
}
