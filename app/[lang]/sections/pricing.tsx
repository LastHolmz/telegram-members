import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/custom-link";
import { getDictionary } from "@/get-dictionary";
import { Lang } from "@/types";
import { features } from "process";

// const offers = [
//   {
//     h: "الخطة الأساسية",
//     price: "200 دينار/شهريًا",
//     ration: "3.7% + 30¢ لكل معاملة",
//     desc: "ابدأ بإضافة الأعضاء أو زيادة المشاهدات على مجموعتك في تيليجرام مع خطتنا الأساسية.",
//     button: "ابدأ الآن",
//   },
//   {
//     h: "الخطة القياسية",
//     price: "80 دولارًا/شهريًا",
//     ration: "2.9% + 30¢ لكل معاملة",
//     desc: "عزز مجتمعك على تيليجرام باستخدام أدوات وميزات متقدمة لإدارة وتنمية المجموعة بشكل أسرع.",
//     button: "ابدأ الآن",
//   },
//   {
//     h: "الخطة المتميزة",
//     price: "200 دولارًا/شهريًا",
//     ration: "2.4% + 30¢ لكل معاملة",
//     desc: "للشركات أو المجتمعات الكبيرة التي تحتاج إلى أدوات إدارة متقدمة وأتمتة ودعم أولوي للنمو في تيليجرام.",
//     button: "ابدأ الآن",
//   },
// ];

const Pricing = async ({ params: { lang } }: { params: { lang: Lang } }) => {
  const dictionary = await getDictionary(lang);

  return (
    <section className="py-10" id="pricing">
      <h3 className=" text-2xl text-primary my-2 md:text-3xl text-center font-bold ">
        {dictionary.Pricing.heading}
      </h3>
      <p className="text-center">{dictionary.Pricing.p}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 my-4">
        {dictionary.Pricing.offers.map((offer, index) => (
          <div key={index} className="p-4">
            <div className=" grid justify-center items-start gap-2 bg-accent rounded-xl shadow-md shadow-background p-4 min-h-96 max-w-full">
              <div className="text-2xl pb-4">{offer.h}</div>
              <div className="text-xl font-bold">{offer.accounts}</div>
              <div className="text-xl ">{offer.price}</div>
              {/* <div className="text-xl ">{feature.ration}</div> */}
              <div className="text-xl ">{offer.members}</div>
              <div className="text-xl">{offer.desc}</div>
              <div className="text-sm">{"دعم فني سريع"}</div>

              <CustomLink
                href={`/${lang}/subscriptions/${offer.id}`}
                size={"lg"}
                className="bg-primary text-start text-white text-lg py-5 border rounded-xl items-center justify-start"
              >
                {offer.button}
              </CustomLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
