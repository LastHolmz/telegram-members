import Logo from "./logo";
import { NavigationBar } from "./navigation-bar";
// import ActionButtons from "./action-buttons";
const ActionButtons = dynamic(() => import("./action-buttons"), { ssr: false });
import { ModeToggle } from "@/components/darkmode-toggler";
import LocaleSwitcher from "../locale-switcher";
import dynamic from "next/dynamic";
export default function Navbar() {
  return (
    <header
      dir="ltr"
      className="flex items-center justify-between px-10 border-b fixed w-full bg-background/85 z-50 phone-only:py-4"
    >
      <Logo />
      <div className="flex-1 flex justify-center w-full">
        <NavigationBar />
      </div>
      <div className="flex items-center justify-between gap-2">
        <LocaleSwitcher />
        <ModeToggle />
        <ActionButtons />
      </div>
    </header>
  );
}
