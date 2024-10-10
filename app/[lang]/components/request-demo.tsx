import { CustomLink } from "@/components/ui/custom-link";
import LangRenderer from "./lang";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { cn } from "@/lib/utils";

const RequestDemo = ({ lang }: { lang: Lang }) => {
  return (
    <CustomLink
      target={"_blank"}
      size={"lg"}
      className={cn(
        "fixed text-lg gap-2 bottom-10",
        lang === "ar" ? "left-10" : "right-10"
      )}
      href={`https://alebtkar-altqni.vercel.app/#contacting`}
    >
      <LangRenderer ar={"طلب"} en={"Request"}></LangRenderer>
      <VscGitPullRequestNewChanges size={24} />
    </CustomLink>
  );
};

export default RequestDemo;
