import { Button } from "@/components/ui/button";
import Image from "next/image";

const FourthSection = () => {
  return (
    <section className="items-center flex justify-center bg-secondary py-10">
      <div className="flex container gap-10 justify-center items-center flex-col md:flex-row py-10">
        {" "}
        <div className="w-full gap-5 flex flex-col items-center md:items-start text-start mx-auto rounded-xl text-foreground font-normal text-sm">
          <h5 className="text-2xl md:text-3xl text-center md:text-start font-bold ">
            Start building your online store today.
          </h5>
          <div>
            Curious about how Bird can help your business? Get in touch with our
            team to learn more about our platform and how we can help you grow
            your business.
          </div>

          <Button aria-label="contact sales Button" className="" size={"lg"}>
            {" "}
            Contact Sales
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

export default FourthSection;
