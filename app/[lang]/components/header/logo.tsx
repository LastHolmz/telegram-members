"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const Logo = () => {
  const { lang } = useParams();
  return (
    <Link href={`/${lang}`} scroll className="w-16 md:h-24 h-16">
      <Image
        src="/logo.png"
        width={1000}
        height={1000}
        alt="logo"
        className=" w-full h-full object-cover"
        priority
      />
    </Link>
  );
};

export default Logo;
