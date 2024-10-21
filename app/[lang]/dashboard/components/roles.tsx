import { Lang } from "@/types";
import { Roles } from "@prisma/client";
import { useParams } from "next/navigation";

interface RoleComponentProps {
  role: Roles;
}

const RoleComponent: React.FC<RoleComponentProps> = ({ role }) => {
  const { lang }: { lang: Lang } = useParams();
  const roleTranslations: Record<Roles, Record<string, string>> = {
    [Roles.user]: {
      ar: "مستخدم",
      en: "User",
    },
    [Roles.admin]: {
      ar: "مشرف",
      en: "Admin",
    },
    [Roles.superAdmin]: {
      ar: "مدير",
      en: "Manager",
    },
  };

  const roleColors: Record<Roles, { bg: string; textColor: string }> = {
    [Roles.user]: {
      bg: "bg-yellow-600", // Green for user
      textColor: "text-white",
    },
    [Roles.admin]: {
      bg: "bg-green-600", // Yellow for admin
      textColor: "text-white",
    },
    [Roles.superAdmin]: {
      bg: "bg-blue-600", // Red for superAdmin
      textColor: "text-white",
    },
  };

  // Ensure that the role exists in translations and colors
  if (!roleTranslations[role] || !roleColors[role]) {
    return null; // Return nothing or a fallback UI if the role is not defined
  }

  const roleText = roleTranslations[role][lang];
  const { bg, textColor } = roleColors[role];

  return (
    <div className={`px-2 py-0.5 text-center rounded ${bg} ${textColor}`}>
      <span className="text-sm  font-semibold">{roleText}</span>
    </div>
  );
};

export const roleToText = ({ role, lang }: { role: Roles; lang: Lang }) => {
  const roleTranslations: Record<Roles, Record<string, string>> = {
    [Roles.user]: {
      ar: "مستخدم",
      en: "User",
    },
    [Roles.admin]: {
      ar: "مشرف",
      en: "Admin",
    },
    [Roles.superAdmin]: {
      ar: "مدير",
      en: "Manager",
    },
  };
  const roleText = roleTranslations[role][lang];
  return roleText;
};

export default RoleComponent;
