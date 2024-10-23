"use client";

import AccessibleDialogForm from "@/reusable-components/accible-dialog-form";
import { cancelSubscriptionActoin, payVoucherActoin } from "../actions";
import SubmitButton from "@/reusable-components/submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Lang } from "@/types";
import { Subscription } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiWarning } from "react-icons/ci";
import Form from "@/reusable-components/form";
import { useState } from "react";
import { getDaysSinceCreation } from "@/lib/date";

export const PayVoucherForm = () => {
  const { lang }: { lang: Lang } = useParams();

  return (
    <AccessibleDialogForm
      trigger={
        <Button>{lang === "ar" ? "تعبئة الكرت" : "Recharge Voucher"}</Button>
      }
      action={payVoucherActoin}
      title={lang === "ar" ? "تعبئة الكرت" : "Recharge Voucher"}
      description={
        lang === "ar"
          ? "هل أنت متأكد من تعبئة الكرت؟"
          : "Are you sure you want to recharge the voucher?"
      }
    >
      <div className="grid gap-2">
        <Label htmlFor="code">{lang === "ar" ? "القيمة" : "Value"}</Label>
        <Input
          type="string"
          name="code"
          id="code"
          required
          placeholder={
            lang === "ar"
              ? "ادخل قيمة الكرت هنا"
              : "Enter the voucher value here"
          }
        />
      </div>
      <SubmitButton className="mt-4 phone-only:w-full">
        {lang === "ar" ? "تعبئة" : "Recharge"}
      </SubmitButton>
    </AccessibleDialogForm>
  );
};

export const CancelSubscriptionForm = ({
  subscriptoin,
  userId,
}: {
  userId: string;
  subscriptoin: Subscription;
}) => {
  const { lang }: { lang: Lang } = useParams();
  const [confirmSentence, setConfirmSentence] = useState("");

  // Localized strings
  const localizedText = {
    ar: {
      cancel: "الغاء الإشتراك",
      cancelWarning: `انت على وشك الغاء اشتراكك في الباقة ${subscriptoin.type}`,
      remaining: (days: number) =>
        `لم تنتهي مدة الإشتراك بعد, لا يزال لديك ${days} يوم`,
      expired: "لقد انتهت مدة الإشتراك بالفعل",
      confirmPrompt: `اكتب "الغاء الإشتراك ${subscriptoin.type}" في الأسفل`,
      cancelSubscription: "الغاء الإشتراك",
    },
    en: {
      cancel: "Cancel Subscription",
      cancelWarning: `You are about to cancel your ${subscriptoin.type} subscription.`,
      remaining: (days: number) =>
        `Your subscription is still active, you have ${days} days left.`,
      expired: "Your subscription has already expired.",
      confirmPrompt: `Type "Cancel Subscription ${subscriptoin.type}" below.`,
      cancelSubscription: "Cancel Subscription",
    },
  };

  const text = localizedText[lang] || localizedText.en; // Fallback to English if `lang` is not defined

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-500 dark:bg-red-600 dark:hover:bg-red-500 hover:bg-red-400">
          {text.cancel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[90%] px-4 py-8">
        <DialogHeader>
          <DialogTitle>
            <CiWarning className=" mx-auto w-14 h-14 text-red-500" />
            <p className="text-red-500 text-base">{text.cancelWarning}</p>
          </DialogTitle>
          <DialogDescription>
            {getDaysSinceCreation(subscriptoin.creationDate) < 30
              ? text.remaining(getDaysSinceCreation(subscriptoin.creationDate))
              : text.expired}
          </DialogDescription>
        </DialogHeader>
        <Form action={cancelSubscriptionActoin}>
          <Input type="hidden" name="userId" value={userId} />
          <Input type="hidden" name="subscriptionId" value={subscriptoin.id} />
          <div className="grid gap-3 my-2">
            <div>{text.confirmPrompt}</div>
            <Input
              type="text"
              id="confirm"
              value={confirmSentence}
              onChange={(e) => setConfirmSentence(e.target.value)}
            />
          </div>
          <SubmitButton
            className="w-full"
            disabled={
              lang === "ar"
                ? `الغاء الإشتراك ${subscriptoin.type}` !== confirmSentence
                : `Cancel Subscription ${subscriptoin.type}` !== confirmSentence
            }
          >
            {text.cancelSubscription}
          </SubmitButton>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
