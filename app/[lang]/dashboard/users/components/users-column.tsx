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
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Subscription, User } from "@prisma/client";
import RoleComponent from "../../components/roles";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { UpdateUserRoleForm } from "./forms";

export const usersTable: ColumnDef<
  User & { Subscription: Subscription | null }
>[] = [
  {
    accessorKey: "الاسم",
    header: "الاسم",
    cell: ({ row }) => {
      if (row) {
        const fullName = row.original?.fullName;
        return <div>{fullName ?? "لايوجد"}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "رقم الهاتف",
    header: "رقم الهاتف",
    cell: ({ row }) => {
      if (row) {
        const phone = row.original?.phoneNumber;
        return <div>{phone}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "البريد",
    header: "البريد",
    cell: ({ row }) => {
      if (row) {
        const email = row.original?.email;
        return <div>{email}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "مشترك",
    header: "مشترك",
    cell: ({ row }) => {
      if (row) {
        const subscription = row.original?.Subscription;
        return (
          <div className="mx-auto w-fit">
            {subscription?.valid ? (
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
    accessorKey: "الدور",
    header: "الدور",
    cell: ({ row }) => {
      if (row) {
        const role = row.original?.role;
        return (
          <div className="  rounded ">
            <RoleComponent role={role} />
          </div>
        );
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "موثق",
    header: "موثق",
    cell: ({ row }) => {
      if (row) {
        const verified = row.original?.verified;
        return (
          <div className="mx-auto w-fit">
            {verified ? (
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
  // {
  //   accessorKey: "البريد",
  //   header: "البريد",
  //   cell: ({ row }) => {
  //     if (row) {
  //       const email = row.original?.email;
  //       return <div>{email}</div>;
  //     } else {
  //       <div>لايوجد</div>;
  //     }
  //   },
  // },
  // {
  //   accessorKey: "المحتوى",
  //   header: "المحتوى",
  //   cell: ({ row }) => {
  //     if (row) {
  //       const content = row.original?.content;
  //       return <div>{content.substring(0, 200)}</div>;
  //     } else {
  //       <div>لايوجد</div>;
  //     }
  //   },
  // },

  {
    id: "actions",
    header: "الأحداث",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
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
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(String(user.phoneNumber));
                toast({
                  className: "bg-primary text-white",
                  description: "تم نسخ رقم الهاتف بنجاح",
                });
              }}
            >
              نسح رقم الهاتف
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <UpdateUserRoleForm user={user} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
