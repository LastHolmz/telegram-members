import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";

const MainSection = async ({
  params: { lang },
}: {
  params: { lang: Lang };
}) => {
  const dictionary = await getDictionary(lang);

  return (
    <section className="md:py-20 py-16 flex justify-center items-center bg-gradient-to-r min-h-screen from gray-00 to-gray-200 spacey-10">
      <div className="container mx-auto text-center mt-10">
        <h1 className="text-4xl md:text-6xl flex justify-center font-bold md:px-20 pb-10 text-gradient bg-gradient-to-r from-primary to-gradaint bg-clip-text text-transparent">
          {dictionary.main.heading}
        </h1>

        <p className="text-lg md:text-xl md-10 bg-gradient-to-r from-black to-gray-400 dark:from-white dark:to-gray-500 bg-clip-text text-transparent font-bold">
          {dictionary.main.p}
        </p>

        <div className="flex gap-4 justify-center pt-10">
          <Button size={"lg"} aria-label="get started Button">
            {dictionary.main.buttons.start}
          </Button>
          <Button
            size={"lg"}
            variant={"secondary"}
            aria-label="learn more Button"
          >
            {dictionary.main.buttons.learn}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
