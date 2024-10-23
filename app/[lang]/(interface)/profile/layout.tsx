import React, { ReactNode } from "react";
import NavigationTabs, {
  HomeTabLink,
  TabLink,
} from "../../components/navigation-tabs";

const layout = ({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: string };
}) => {
  return (
    <main className="mt-16 md:mt-24">
      <NavigationTabs className="my-1">
        <HomeTabLink
          href={`/${lang}/profile`}
          content={lang === "ar" ? "عام" : "general"}
        />
        <TabLink
          href={`/${lang}/profile/accounts`}
          content={lang === "ar" ? "حساباتي" : "accounts"}
        />
        <TabLink
          href={`/${lang}/profile/groups`}
          content={lang === "ar" ? "مجموعاتي" : "groups"}
        />
      </NavigationTabs>
      {children}
    </main>
  );
};

export default layout;
