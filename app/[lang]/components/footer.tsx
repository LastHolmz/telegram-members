import Link from "next/link";
import LangRenderer from "./lang";

const Footer = () => {
  return (
    <footer className="border-t-[1px] mb-22">
      <div className="flex justify-evenly gap-4 p-4">
        <div>
          <LangRenderer
            ar={
              <div className="flex gap-1 p-4 cursor-pointer text-xl">
                جميع الحقوق محفوظة. {new Date().getFullYear()} بواسطة{" "}
                <span className="inline-block font-bold text-primary">
                  <Link
                    href={"https://alebtkar-altqni.vercel.app/"}
                    target={"_blank"}
                  >
                    الابتكار
                  </Link>
                </span>
                .
              </div>
            }
            en={
              <div className="flex  gap-1 p-4 cursor-pointer text-xl">
                All rights reserved. {new Date().getFullYear()} by{" "}
                <span className=" inline-block font-bold text-primary">
                  <Link
                    href={"https://alebtkar-altqni.vercel.app/"}
                    target={"_blank"}
                  >
                    ALEBTKAR
                  </Link>
                </span>
                .
              </div>
            }
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
