declare type Lang = "ar" | "en";

declare interface TelegramAccount {
  id: string;
  accId: number;
  session: string;
  username?: string;
  ownerId: string;
  phoneNumber: string;
  password?: string;
}
