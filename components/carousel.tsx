"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LangRenderer from "@/app/[lang]/components/lang";

const images = [
  {
    url: "/images/logos/logo-1.svg",
    alt: "Logo",
  },

  {
    url: "/images/logos/logo-3.svg",
    alt: "Logo",
  },

  {
    url: "/images/logos/logo-4.svg",
    alt: "Logo",
  },

  {
    url: "/images/logos/logo-5.svg",
    alt: "Logo",
  },

  {
    url: "/images/logos/logo-6.svg",
    alt: "Logo",
  },

  {
    url: "/images/logos/logo-7.svg",
    alt: "Logo",
  },

  {
    url: "/images/logos/logo-8.svg",
    alt: "Logo",
  },

  {
    url: "/images/logos/logo-9.svg",
    alt: "Logo",
  },

  {
    url: "/images/logos/logo-10.svg",
    alt: "Logo",
  },

  {
    url: "/images/logos/logo-11.svg",
    alt: "Logo",
  },

  {
    url: "/images/logos/logo-12.svg",
    alt: "Logo",
  },

  {
    url: "/images/logos/logo-13.svg",
    alt: "Logo",
  },
];

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full bg-secondary py-10">
      <h2
        className="items-center justify-center flex text-xl md:text-3xl text-center md:text-start font-bold md:pb-10 px-10 bg-gradient-to-r from-gradaint to-primary/90 bg-clip-text text-transparent
        "
      >
        <LangRenderer
          en={"More than 100+ communities have grown with TeMe"}
          ar={"أكثر من 100+ مجتمع نمى باستخدام TeMe"}
        />
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence custom={currentImageIndex}>
          {images.map((image, index) => (
            <div key={index} className=" flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: index === currentImageIndex ? 1 : 0.5,
                  scale: index === currentImageIndex ? 1.2 : 1,
                  transition: { duration: 0.5 },
                }}
                className="flex h-40 w-40 justify-center items-center"
                exit={{ opacity: 0 }}
                custom={index}
                transition={{
                  opacity: { duration: 0.5 },
                }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={200}
                  height={200}
                  className="object-contain h-16 w-16 items-center justify-center flex mx-auto"
                />
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Carousel;
