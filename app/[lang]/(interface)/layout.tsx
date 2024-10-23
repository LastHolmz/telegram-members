import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import ButtonLinkIcon from "../components/button-link-icon";
import Header from "../components/header/header";
import { MobileNavigationBar } from "../components/bottom-navigation-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex-1 m-header">
        {children}
        <div className="fixed flex-col transition-all duration-500 hover:gap-5 w-fit top-1/2 transform -translate-y-1/2 z-1 left-1 flex items-center gap-2 justify-end px-1">
          <ButtonLinkIcon
            href="https://wa.me/+218928666458"
            Icon={FaWhatsapp}
            bgClass="bg-green-400"
            target={"_blank"}
          />
          <ButtonLinkIcon
            href="https://t.me/zek_z"
            Icon={FaTelegramPlane}
            bgClass="bg-sky-400"
            target={"_blank"}
          />
        </div>
      </div>

      <MobileNavigationBar />
    </div>
  );
}
