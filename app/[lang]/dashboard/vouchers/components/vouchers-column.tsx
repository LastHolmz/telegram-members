"use client";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { User, Voucher } from "@prisma/client";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { DeleteVoucherForm } from "./forms";

export const vouchersTable: ColumnDef<Voucher & { Owner: User | null }>[] = [
  {
    accessorKey: "الكود",
    header: "الكود",
    cell: ({ row }) => {
      if (row) {
        const code = row.original?.code;
        return (
          <div className="group">
            <span className="block group-hover:hidden">*********</span>
            <span className="group-hover:block hidden">{code ?? "لايوجد"}</span>
          </div>
        );
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "القيمة",
    header: "القيمة",
    cell: ({ row }) => {
      if (row) {
        const value = row.original?.value;
        return <div>{value}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "مستعملة",
    header: "مستعملة",
    cell: ({ row }) => {
      if (row) {
        const used = row.original?.used;
        return (
          <div className="mx-auto w-fit">
            {used ? (
              <IoMdCheckmark size={22} className="text-green-500" />
            ) : (
              <FaXmark size={22} className="text-red-500" />
            )}
          </div>
        );
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "المستخدم",
    header: "المستخدم",
    cell: ({ row }) => {
      if (row) {
        const user = row.original?.Owner;
        return <div className="mx-auto w-fit">{user?.fullName}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },

  {
    id: "actions",
    header: "الأحداث",
    enableHiding: false,
    cell: ({ row }) => {
      const voucher = row.original;
      return (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">افتح الأحداث</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>الأحداث</DropdownMenuLabel>
            {voucher?.Owner && (
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(
                    String(voucher?.Owner?.phoneNumber)
                  );
                  toast({
                    className: "bg-primary text-white",
                    description: "تم نسخ رقم الهاتف بنجاح",
                  });
                }}
              >
                نسح الهاتف
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(String(voucher.code));
                toast({
                  className: "bg-primary text-white",
                  description: "تم نسخ الكود",
                });
              }}
            >
              نسح الكود
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteVoucherForm code={`${voucher.code}`} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
