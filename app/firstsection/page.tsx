import { Button } from "@/components/ui/button";

const Firstsection = () => {
  return (
    <section className="md:py-20 py-16 bg-gradient-to-r from gray-00 to-gray-200 spacey-10">
      <div className="container mx-auto text-center mt-10">
        <div className="text-6xl flex justify-center font-bold md:px-20 pb-10 text-gradient bg-gradient-to-r from-primary to-gradaint bg-clip-text text-transparent">
          Build a brand and start selling in seconds
        </div>

        <p className="text-lg md:text-xl md-10 bg-gradient-to-r from-black to-gray-400 dark:from-white dark:to-gray-500 bg-clip-text text-transparent font-bold">
          No matter what you sell, Bird Software has everything you need to run
          your online store.
        </p>

        <div className="flex gap-4 justify-center pt-10">
          <Button size={"lg"} aria-label="get started Button">
            Get Started
          </Button>
          <Button
            size={"lg"}
            variant={"secondary"}
            aria-label="learn more Button"
          >
            Learn More
          </Button>
        </div>

        <div className="pt-10">
          <video className="rounded-xl" autoPlay muted loop>
            <source src="/content/video-3.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default Firstsection;