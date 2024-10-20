import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { IconType } from "react-icons/lib";

interface ButtonLinkIconProps extends LinkProps {
  Icon: IconType;
  bgClass?: string;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const ButtonLinkIcon: React.FC<ButtonLinkIconProps> = ({
  Icon,
  bgClass,
  href = "#",
  className,
  target,
  ...props
}) => {
  return (
    <Link
      target={target}
      {...props}
      href={href}
      className={cn("Btn z-50 shadow-sm", className)}
    >
      <span className="svgContainer">
        <Icon color="white" />
      </span>
      <span className={cn("BG", bgClass)}></span>
    </Link>
  );
};

export default ButtonLinkIcon;
