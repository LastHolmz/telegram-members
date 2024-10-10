import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import Image from "next/image";

const SalesSection = async ({
  params: { lang },
}: {
  params: { lang: Lang };
}) => {
  const dictionary = await getDictionary(lang);

  return (
    <section className="items-center flex justify-center bg-secondary py-10">
      <div className="flex container gap-10 justify-center items-center flex-col md:flex-row py-10">
        {" "}
        <div className="w-full gap-5 flex flex-col items-center md:items-start text-start mx-auto rounded-xl text-foreground font-normal text-sm">
          <h5 className="text-2xl md:text-3xl text-center md:text-start font-bold ">
            {dictionary.sales.heading}
          </h5>
          <div>{dictionary.sales.p}</div>

          <Button aria-label="contact sales Button" className="" size={"lg"}>
            {" "}
            {dictionary.sales.buttons.sales}
          </Button>
        </div>
        <div className="w-[80%] mx-auto md:w-1/3">
          <Image
            src={"/content/bg3.png"}
            alt="bg"
            width={1000}
            height={1000}
            className=" object-cover h-full w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default SalesSection;
