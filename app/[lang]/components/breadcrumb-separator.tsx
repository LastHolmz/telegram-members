"use client";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";

const LangBreadcrumbSeparator = () => {
  const { lang } = useParams();
  return (
    <BreadcrumbSeparator>
      {lang === "ar" ? <ChevronLeft /> : <ChevronRight />}
    </BreadcrumbSeparator>
  );
};

export default LangBreadcrumbSeparator;
