import Image from "next/image";
import { CiShop } from "react-icons/ci";
import { FaShieldAlt } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { SiStatista } from "react-icons/si";

const ThirdSection = () => {
  return (
    <section className="flex p-10 flex-col md:flex-row text-center md:text-start-row md:justify-evenly">
      <div className="flex-col lg:flex-row justify-center items-center gap-6 md:px-10 flex">
        <div className="md:w-1/3 w-full">
          <Image src={"/content/bg2.png"} alt={"bg"} width={600} height={600} />{" "}
        </div>

        <div className="flex-col  p-4 rounded-xl md:w-2/3">
          <h3 className="text-xl flex justify-center text-center md:text-3xl bg-gradient-to-l  from-primary  to-gradaint/80 bg-clip-text font-bold text-transparent ">
            Fully Customizable eCommerce
          </h3>

          <div className="md:px-20 space-y-6 flex-col items-center w-full justify-center">
            <div className="text-lg pt-10 flex justify-center items-center flex-col md:flex-row text-center md:text-start gap-4">
              <div className="text-primary bg-primary/20 px-2 py-1 rounded-md">
                <CiShop size={48} />
              </div>

              <div>
                Choose from a variety of store templates to get started. And
                customize your store to fit your brand.
              </div>
            </div>

            <div className="text-lg flex justify-center items-center gap-4">
              <div className="text-lg flex flex-col md:flex-row text-center md:text-start items-center gap-5">
                <div className="text-primary bg-primary/20 px-2 py-1 rounded-md">
                  <HiOutlineColorSwatch size={48} />
                </div>
                <div>
                  Add unlimited products and variations. And manage your
                  inventory with ease.
                </div>
              </div>
            </div>
            <div className="text-lg flex justify-center items-center gap-4">
              <div className="text-lg flex-col md:flex-row text-center md:text-start flex items-center gap-5">
                <div className="text-primary bg-primary/20 px-2 py-1 rounded-md">
                  <SiStatista size={48} />
                </div>
                <div>
                  Gain valuable insights into your customers and products with
                  our analytics tools.
                </div>
              </div>
            </div>

            <div className="flex-col">
              <div className="text-lg flex-col md:flex-row text-center md:text-start flex items-center gap-5">
                <div className="text-primary bg-primary/20 px-2 py-1 rounded-md">
                  <FaShieldAlt size={48} />
                </div>
                <div>
                  Best in class security to protect your data and your
                  customers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
