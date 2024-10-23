import { CustomLink } from "@/components/ui/custom-link";
import { getDictionary } from "@/get-dictionary";
import { getSession } from "@/lib/auth";
import { Lang, OfferType } from "@/types";
import { notFound, redirect } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/db/users";
import { SubscribeForm } from "./components/forms";

const offerTypes: OfferType[] = ["basic", "premium", "sponsered"];

export async function generateStaticParams() {
  return offerTypes.map((offer) => ({ id: offer }));
}

interface Offer {
  id: string;
  h: string;
  price: string;
  desc: string;
  button: string;
  accounts: string;
  members: string;
  price_int: number;
  allowedAccounts: number;
}
const page = async ({
  params: { id, lang },
}: {
  params: { id: string; lang: Lang };
}) => {
  const sessoin = await getSession();
  const dictionary = await getDictionary(lang);
  const offer: Offer | undefined = dictionary.Pricing.offers.filter(
    (offer) => offer.id === id
  )[0];
  if (!offer) {
    return notFound();
  }
  if (!sessoin) {
    return (
      <main className="bg-secondary h-full container py-2">
        <Breadcrumb className="my-2" dir="rtl">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${lang}`}>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground/60">
                الباقات
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{offer.h}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mx-auto w-fit content-center h-full  grid gap-2">
          <h1>يجب تسجيل الدخول لشراء الباقة</h1>
          <CustomLink
            href={`/${lang}/sign-in?redirect=/${lang}/subscriptions/${id}`}
          >
            تسجيل الدخول
          </CustomLink>
        </div>
      </main>
    );
  }

  const user = await getUserById(sessoin.id);
  if (!user) {
    redirect(`/${lang}/sign-in?redirect=/${lang}/subscriptions/${id}`);
  }

  return (
    <main className="bg-secondary h-full mt-16 md:mt-24 py-2">
      <Breadcrumb className="my-2 mx-4" dir="rtl">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${lang}`}>الرئيسية</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-foreground/60">
              الباقات
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{offer.h}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container text-center h-3/4 w-1/2 phone-only:w-full flex flex-col justify-center  gap-2">
        <h1 className="font-bold text-xl md:text-2xl">{offer.h}</h1>
        <p className="text-sm text-foreground/80">{offer.desc}</p>
        <Separator className=" bg-primary my-2" />
        <b>{offer.accounts}</b>
        <Separator className=" bg-primary my-2" />
        <ul className="w-full my-2 grid gap-2">
          <li className=" flex justify-between">
            <span>السعر</span>
            <b>{offer.price}</b>
          </li>
          <li className=" flex justify-between">
            <span>الاعضاء</span>
            <b>{offer.members}</b>
          </li>
        </ul>
        <br />
        <SubscribeForm
          user={user}
          subscription={user?.Subscription}
          info={{
            allowedAccounts: offer.allowedAccounts,
            price: offer.price_int,
            type: offer.id as OfferType,
          }}
        />
      </div>
    </main>
  );
};

export default page;
