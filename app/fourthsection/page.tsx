import { Button } from "@/components/ui/button";
import Image from "next/image";

const FourthSection = () => {
  return (
    <section className="items-center flex justify-center md:py-10">
      <div className="text-center md:text-6xl text-4xl bg-gradient-to-r  from-primary  to-gradaint/80 bg-clip-text text-transparent pb-10 font-bold">
        Content Management System.Made Simple.
        <div className="flex container gap-4 justify-center items-center flex-col md:flex-row py-10">
          {" "}
          <div className="w-full md:w-1/3">
            <Image
              src={"/content/bg3.png"}
              alt="bg"
              width={1000}
              height={1000}
              className=" object-cover h-full w-full"
            />
          </div>
          <div className="w-full text-start mx-auto rounded-xl text-foreground font-normal text-sm">
            <div className="text-4xl font-bold mb-5">
              Start building your online store today.
            </div>
            <div>
              Curious about how Bird can help your business? Get in touch with
              our team to learn more about our platform and how we can help you
              grow your business.
            </div>

            <Button
              aria-label="contact sales Button"
              className="mt-4"
              size={"lg"}
            >
              {" "}
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourthSection;
