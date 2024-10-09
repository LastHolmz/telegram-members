import { Button } from "@/components/ui/button";

const FifthSection = () => {
  return (
    <section className="md:py-20 p-10">
      <div className="border-[1px] md:w-2/3 mx-auto p-10 rounded-xl">
        <div className="text-4xl font-bold mb-5">
          Start building your online store today.
        </div>
        <div>
          Curious about how Bird can help your business? Get in touch with our
          team to learn more about our platform and how we can help you grow
          your business.
        </div>

        <Button aria-label="contact sales Button" className="mt-4" size={"lg"}>
          {" "}
          Contact Sales
        </Button>
      </div>
    </section>
  );
};

export default FifthSection;
