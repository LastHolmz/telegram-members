"use client";

import { Lang } from "@/types";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  ar?: string | ReactNode;
  en?: string | ReactNode;
}
const LangRenderer = ({ ar, en }: Props) => {
  const { lang }: { lang: Lang } = useParams();
  if (lang === "ar") {
    return <>{ar}</>;
  }
  if (lang === "en") {
    return <>{en}</>;
  }
  return <></>;
};

export default LangRenderer;
