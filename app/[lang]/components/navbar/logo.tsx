"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const Logo = () => {
  const { lang } = useParams();
  return (
    <Link href={`/${lang}`} scroll>
      <Image
        src="/images/logos/icons8-logo.svg"
        width={30}
        height={30}
        alt="logo"
        priority
      />
    </Link>
  );
};

export default Logo;
