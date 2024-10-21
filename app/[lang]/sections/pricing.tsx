import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Lang } from "@/types";

const features = [
  {
    name: "Basic",
    price: "$40/month",
    fees: "3.7% + 30¢ per transaction",
    description:
      "Start selling online with a simple and easy to use platform. Create your first store in minutes..",
  },
  {
    name: "Standard",
    price: "$80/month",
    fees: "2.9% + 30¢ per transaction",
    description:
      "Level up your business with a powerful eCommerce platform. Get access to all the features you need to grow.",
  },
  {
    name: "Premium",
    price: "$200/month",
    fees: "2.4% + 30¢ per transaction",
    description:
      "For businesses that need more. Get access to all the features you need to grow.",
  },
];

const Pricing = async ({ params: { lang } }: { params: { lang: Lang } }) => {
  const dictionary = await getDictionary(lang);

  return (
    <section className="py-10" id="pricing">
      <h3 className=" text-2xl text-primary my-2 md:text-3xl text-center font-bold ">
        {dictionary.Pricing.heading}
      </h3>
      <p className="text-center">{dictionary.Pricing.p}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 my-4">
        {dictionary.Pricing.offers.map((feature, index) => (
          <div key={index} className="p-4">
            <div className=" grid justify-center items-start gap-4 bg-accent rounded-xl shadow-md shadow-background p-4 min-h-96 max-w-full">
              <div className="text-2xl pb-4">{feature.h}</div>
              <div className="text-xl ">{feature.price}</div>
              <div className="text-xl ">{feature.ration}</div>
              <div className="text-xl">{feature.desc}</div>

              <Button
                size={"lg"}
                className="bg-primary text-start text-white text-lg py-5 border rounded-xl items-center justify-start"
              >
                {feature.button}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
