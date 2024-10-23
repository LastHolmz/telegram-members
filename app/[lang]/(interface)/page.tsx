import Carousel from "@/components/carousel";
import MainSection from "../sections/main";
import ThirdSection from "../sections/get-started";
import SecondSection from "../sections/brands";
import Pricing from "../sections/pricing";
import SalesSection from "../sections/sales";
import { Locale } from "@/i18n-config";
import Footer from "../components/footer";
import ButtonLinkIcon from "../components/button-link-icon";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { cn } from "@/lib/utils";

const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  return (
    <>
      <main>
        <MainSection
          params={{
            lang: lang,
          }}
        />
        <Carousel />
        <SecondSection
          params={{
            lang: lang,
          }}
        />
        <ThirdSection
          params={{
            lang: lang,
          }}
        />
        <SalesSection
          params={{
            lang: lang,
          }}
        />
        <Pricing
          params={{
            lang: lang,
          }}
        />
      </main>
      <Footer />
      <br />
      <br />
      <div
        className={cn(
          "fixed flex-col transition-all duration-500 hover:gap-5 w-fit top-1/2 transform -translate-y-1/2 z-1 flex items-center gap-2 justify-end px-1",
          lang === "ar" ? "left-1" : "right-1"
        )}
      >
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
    </>
  );
};

export default Home;
