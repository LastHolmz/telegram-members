import { getDictionary } from "@/get-dictionary";
import { Lang } from "@/types";
import Image from "next/image";
import { CiShop } from "react-icons/ci";
import { FaShieldAlt } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { SiStatista } from "react-icons/si";

const ThirdSection = async ({
  params: { lang },
}: {
  params: { lang: Lang };
}) => {
  const dictionary = await getDictionary(lang);

  return (
    <section className="flex py-10 flex-col md:flex-row text-center w-full min-h-[50vh]">
      <div className="flex-col lg:flex-row justify-center items-center gap-6 md:px-10 flex">
        <div className="flex-col p-4 rounded-xl md:w-2/3">
          <h3 className="bg-gradient-to-l mb-10 md:mb-0 from-primary  to-gradaint/90 bg-clip-text font-bold text-transparent text-2xl md:text-3xl text-center md:text-start ">
            {dictionary.customization.heading}
          </h3>

          <div className="flex flex-col phone-only:container gap-10 w-full justify-center">
            <div className="text-lg pt-10 flex justify-center items-center flex-row text-start gap-4">
              <div className="text-primary bg-primary/20 px-2 py-1 rounded-md">
                <CiShop size={48} />
              </div>

              <div>{dictionary.customization.first}</div>
            </div>
            <div className="flex-col">
              <div className="text-lg flex flex-row text-start items-center gap-5">
                <div className="text-primary bg-primary/20 px-2 py-1 rounded-md">
                  <HiOutlineColorSwatch size={48} />
                </div>
                <div>{dictionary.customization.second}</div>
              </div>
            </div>

            <div className="flex-col">
              <div className="text-lg flex-row text-start flex items-center gap-5">
                <div className="text-primary bg-primary/20 px-2 py-1 rounded-md">
                  <SiStatista size={48} />
                </div>
                <div>{dictionary.customization.third}</div>
              </div>
            </div>
            <div className="flex-col">
              <div className="text-lg flex-row text-start flex items-center gap-5">
                <div className="text-primary bg-primary/20 px-2 py-1 rounded-md">
                  <FaShieldAlt size={48} />
                </div>
                <div>{dictionary.customization.forth}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/3 hidden md:flex">
          <Image src={"/content/bg2.png"} alt={"bg"} width={600} height={600} />{" "}
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
