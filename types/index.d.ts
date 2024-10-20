import { Roles } from "@prisma/client";

type Lang = "ar" | "en";

declare interface UserSession {
  id: string;
  fullName: string;
  role: Roles;
  phoneNumber: number;
  verified: boolean;
  email: string;
}
