import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import ButtonLinkIcon from "../components/button-link-icon";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
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
    </main>
  );
}
