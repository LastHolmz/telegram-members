import Carousel from "@/components/carousel";
import MainSection from "./sections/main";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer";
import ThirdSection from "./sections/get-started";
import SecondSection from "./sections/brands";
import Pricing from "./sections/pricing";
import SalesSection from "./sections/sales";
import { Locale } from "@/i18n-config";
import RequestDemo from "./components/request-demo";

const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  return (
    <>
      <Navbar />
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
      <RequestDemo lang={lang} />
    </>
  );
};

export default Home;
