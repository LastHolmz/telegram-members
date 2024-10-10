import { Button } from "@/components/ui/button";
import { TbUserEdit } from "react-icons/tb";
import { FaBoltLightning, FaDev } from "react-icons/fa6";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { IconType } from "react-icons";
import { MdLoyalty, MdSupportAgent } from "react-icons/md";
import { getDictionary } from "@/get-dictionary";
import LangRenderer from "../components/lang";

interface Feature {
  name: string;
  arName: string;
  icon: IconType;
  description: string;
  arDesc: string;
}

const features: Feature[] = [
  {
    name: "Customizable",
    arName: "قابل للتخصيص",
    description:
      "Choose from 100s of designer made templates, and change anything you want to create your professional eCommerce website.",
    arDesc:
      "اختر من مئات القوالب المصممة، وقم بتغيير أي شيء تريده لإنشاء موقع التجارة الإلكترونية الاحترافي الخاص بك.",
    icon: TbUserEdit,
  },
  {
    name: "Fast",
    arName: "سريع",
    description:
      "Choose from 100s of designer made templates, and change anything you want to create your professional eCommerce website.",
    arDesc:
      "اختر من مئات القوالب المصممة، وقم بتغيير أي شيء تريده لإنشاء موقع التجارة الإلكترونية الاحترافي الخاص بك.",
    icon: FaBoltLightning,
  },
  {
    name: "Integrations",
    arName: "تكاملات",
    description:
      "Choose from 100s of designer made templates, and change anything you want to create your professional eCommerce website.",
    arDesc:
      "اختر من مئات القوالب المصممة، وقم بتغيير أي شيء تريده لإنشاء موقع التجارة الإلكترونية الاحترافي الخاص بك.",
    icon: PiPlugsConnectedBold,
  },
  {
    name: "Full Stack",
    arName: "مكدس كامل",
    description:
      "Choose from 100s of designer made templates, and change anything you want to create your professional eCommerce website.",
    arDesc:
      "اختر من مئات القوالب المصممة، وقم بتغيير أي شيء تريده لإنشاء موقع التجارة الإلكترونية الاحترافي الخاص بك.",
    icon: FaDev,
  },
  {
    name: "Loyalty",
    arName: "الولاء",
    description:
      "Set up your loyalty program and start rewarding your customers for their purchases and actions they take on your site.",
    arDesc:
      "قم بإعداد برنامج الولاء الخاص بك وابدأ بمكافأة عملائك على مشترياتهم والإجراءات التي يتخذونها على موقعك.",
    icon: MdLoyalty,
  },
  {
    name: "Support",
    arName: "الدعم",
    description:
      "Get 24/7 support from our team to help you with any issues you have.",
    arDesc:
      "احصل على دعم على مدار الساعة طوال أيام الأسبوع من فريقنا لمساعدتك في أي مشكلات تواجهها.",
    icon: MdSupportAgent,
  },
];

const SecondSection = async ({
  params: { lang },
}: {
  params: { lang: Lang };
}) => {
  const dictionary = await getDictionary(lang);

  return (
    <section>
      <div className="container py-10">
        <div className="p-5 flex min-h-[50vh] justify-center flex-col md:items-start items-center gap-10">
          <h3 className=" bg-gradient-to-r from-primary/100 to-gradaint/80 bg-clip-text text-transparent text-xl md:text-3xl text-center md:text-start font-bold">
            {dictionary.start.heading}
          </h3>
          <p className="text-lg  text-center md:text-start">
            {dictionary.start.p}
          </p>
          <Button size={"lg"} aria-label="get started Button">
            {dictionary.start.buttons.start}
          </Button>
        </div>
      </div>

      <div className="flex-col flex items-center justify-center bg-secondary py-10">
        <h4 className="text-2xl md:text-3xl text-center md:text-start flex font-bold  bg-gradient-to-r  from-primary  to-gradaint bg-clip-text text-transparent">
          {dictionary.feature.heading}
        </h4>

        <div className="grid grid-cols-1 p-4 container  lg:grid-cols-3 md:grid-cols-2 gap-4 md:gap-10">
          {features.map((feature, index) => (
            <Feature feature={feature} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Feature = ({ feature }: { feature: Feature }) => {
  return (
    <LangRenderer
      en={
        <div
          className="flex-col space-y-6 pb-10 
          p-8  items-center justify-center w-full"
        >
          <div className="text-3xl font-bold flex flex-col justify-center items-center">
            <feature.icon className=" text-primary font-bold" size={"48"} />
            <div className="text-xl my-4">{feature.name}</div>

            <p className="text-sm font-normal text-center">
              {feature.description}
            </p>
          </div>
        </div>
      }
      ar={
        <div
          className="flex-col space-y-6 pb-10 
          p-8  items-center justify-center w-full"
        >
          <div className="text-3xl font-bold flex flex-col justify-center items-center">
            <feature.icon className=" text-primary font-bold" size={"48"} />
            <div className="text-xl my-4">{feature.arName}</div>

            <p className="text-sm font-normal text-center">{feature.arDesc}</p>
          </div>
        </div>
      }
    />
  );
};

export default SecondSection;
