import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import ButtonLinkIcon from "../components/button-link-icon";
import Header from "../components/header/header";
import Footer from "../components/footer";

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
        <div className="fixed transition-all duration-500 hover:gap-5 w-fit bottom-10 z-1 left-1 flex items-center gap-2 justify-end px-4">
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
      <Footer />
    </div>
  );
}
