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
    name: "Account Management",
    arName: "إدارة الحسابات",
    description:
      "Add and manage multiple Telegram accounts with ease. Control all your accounts in one place.",
    arDesc:
      "أضف وأدر عدة حسابات Telegram بسهولة. تحكم في جميع حساباتك من مكان واحد.",
    icon: TbUserEdit,
  },
  {
    name: "Member Addition",
    arName: "إضافة الأعضاء",
    description:
      "Automatically add members to your Telegram groups. Boost your group size effortlessly.",
    arDesc:
      "أضف الأعضاء إلى مجموعات Telegram الخاصة بك تلقائيًا. قم بزيادة حجم مجموعتك دون عناء.",
    icon: FaBoltLightning,
  },
  {
    name: "Buy Members",
    arName: "شراء الأعضاء",
    description:
      "Easily purchase new members for your Telegram group. Enhance your group's popularity with real members.",
    arDesc:
      "قم بشراء أعضاء جدد لمجموعة Telegram الخاصة بك بسهولة. عزز شعبية مجموعتك مع أعضاء حقيقيين.",
    icon: MdLoyalty,
  },
  {
    name: "View Booster",
    arName: "زيادة المشاهدات",
    description:
      "Increase the number of views on your Telegram posts and channels. Gain more exposure with our view booster tool.",
    arDesc:
      "قم بزيادة عدد المشاهدات على منشورات وقنوات Telegram الخاصة بك. احصل على المزيد من الظهور باستخدام أداة زيادة المشاهدات.",
    icon: PiPlugsConnectedBold,
  },
  {
    name: "Full Automation",
    arName: "أتمتة كاملة",
    description:
      "Automate your Telegram tasks such as adding members, sending messages, and more. Save time with our automated solutions.",
    arDesc:
      "قم بأتمتة مهام Telegram الخاصة بك مثل إضافة الأعضاء، إرسال الرسائل والمزيد. وفر الوقت باستخدام حلولنا المؤتمتة.",
    icon: FaDev,
  },
  {
    name: "24/7 Support",
    arName: "دعم على مدار الساعة",
    description:
      "Get round-the-clock support from our team to help with any issues or questions you have.",
    arDesc:
      "احصل على دعم على مدار الساعة من فريقنا للمساعدة في أي مشكلات أو أسئلة تواجهها.",
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
