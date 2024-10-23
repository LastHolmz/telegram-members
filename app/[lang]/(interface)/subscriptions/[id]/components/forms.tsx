"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/user";
import Form from "@/reusable-components/form";
import { OfferType } from "@/types";
import { Subscription, User } from "@prisma/client";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";
import { subscribeAction } from "../actions";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/reusable-components/submit-button";
import { CustomLink } from "@/components/ui/custom-link";
import { useParams } from "next/navigation";
import LangRenderer from "@/app/[lang]/components/lang";

export const SubscribeForm = ({
  user,
  subscription,
  info: info,
}: {
  user: User;
  subscription?: Subscription | null;
  info: {
    price: number;
    allowedAccounts: number;
    type: OfferType;
  };
}) => {
  const { lang } = useParams();
  const { user: auth } = useAuth();
  const [open, setOpen] = useState(true);
  if (!auth) {
    return (
      <Dialog open={open} defaultOpen onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button>اشترك</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[90%] px-4 py-8">
          <DialogHeader>
            <DialogTitle>
              <CiWarning className=" mx-auto w-14 h-14 text-red-500" />
            </DialogTitle>
            <DialogDescription className="text-red-500">
              {"يجب تسجيل الدخول اولا"}
            </DialogDescription>
          </DialogHeader>
          {/* content */}
        </DialogContent>
      </Dialog>
    );
  }
  if (subscription && subscription.valid) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>اشترك</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-[90%] px-4 py-8">
          <DialogHeader>
            <DialogTitle>
              <CiWarning className=" mx-auto w-14 h-14 text-red-500" />
            </DialogTitle>
            <DialogDescription className="text-red-500">
              {"انت على وشك الغاء الباقة و بدء في باقة جديدة"}
            </DialogDescription>
          </DialogHeader>
          <CustomLink
            href={`/${lang}/profile#subscription-info`}
            scroll
            className="w-full"
            variant={"secondary"}
          >
            <LangRenderer ar="الغاء الإشتراك" en="cancel subscriptoin" />
          </CustomLink>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>اشترك</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[90%] px-4 py-8">
        <DialogHeader>
          <DialogTitle>{`الإشتراك في الباقة`}</DialogTitle>
        </DialogHeader>
        <Form action={subscribeAction}>
          <Input type="hidden" name="userId" value={auth.id} />
          <Input type="hidden" name="price" value={info.price} />
          <Input
            type="hidden"
            name="allowedAccounts"
            value={info.allowedAccounts}
          />
          <Input type="hidden" name="type" value={info.type} />
          <ul>
            <ul className="w-full my-2 grid gap-2">
              <li className=" flex justify-between">
                <span>السعر</span>
                <b>{info.price} دينار</b>
              </li>
              <li className=" flex justify-between">
                <span>رصيدي</span>
                <b>{user.money} دينار</b>
              </li>
            </ul>
          </ul>
          <SubmitButton className="w-full" disabled={user.money < info.price}>
            إكمال الإشتراك
          </SubmitButton>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
