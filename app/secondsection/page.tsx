"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TbUserEdit } from "react-icons/tb";
import { FaBoltLightning, FaDev } from "react-icons/fa6";
import { PiPlugsConnectedBold } from "react-icons/pi";
import { IconType } from "react-icons";
import { MdLoyalty, MdSupportAgent } from "react-icons/md";

const features: { name: string; icon: IconType; description: string }[] = [
  {
    name: "Customizable",
    description:
      "Choose from 100s of designer made templates, and change anything you want to create your professional eCommerce website.",
    icon: TbUserEdit,
  },
  {
    name: "Fast ",
    description:
      "Choose from 100s of designer made templates, and change anything you want to create your professional eCommerce website.",
    icon: FaBoltLightning,
  },
  {
    name: "Integrations",
    description:
      "Choose from 100s of designer made templates, and change anything you want to create your professional eCommerce website.",
    icon: PiPlugsConnectedBold,
  },
  {
    name: "Full Stack",
    description:
      "Choose from 100s of designer made templates, and change anything you want to create your professional eCommerce website.",
    icon: FaDev,
  },
  {
    name: "Loyalty",
    description:
      "Set up your loyalty program and start rewarding your customers for their purchases and actions they take on your site.",
    icon: MdLoyalty,
  },
  {
    name: "Support",
    description:
      "Get 24/7 support from our team to help you with any issues you have.",
    icon: MdSupportAgent,
  },
];

const SecondSection = () => {
  return (
    <section>
      <div className="container py-10">
        <div className="p-5 flex min-h-[50vh] justify-center flex-col md:items-start items-center gap-10">
          <h3 className=" bg-gradient-to-r from-primary/100 to-gradaint/80 bg-clip-text text-transparent text-xl md:text-3xl text-center md:text-start font-bold">
            From startup to enterprise, Bird is built for every type of
            business.
          </h3>
          <p className="text-lg  text-center md:text-start">
            Built for all businesses and communities, Bird is the only platform
            you need to grow your business.
          </p>
          <Button size={"lg"} aria-label="get started Button">
            Get Started
          </Button>
        </div>
      </div>

      <div className="flex-col flex items-center justify-center bg-secondary py-10">
        <h4 className="text-2xl md:text-3xl text-center md:text-start flex font-bold  bg-gradient-to-r  from-primary  to-gradaint bg-clip-text text-transparent">
          Product Features
        </h4>

        <div className="grid grid-cols-1 p-4 container  lg:grid-cols-3 md:grid-cols-2 gap-4 md:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex-col space-y-6 pb-10 
                        p-8  items-center justify-center w-full"
            >
              <div className="text-3xl font-bold flex flex-col justify-center items-center">
                <feature.icon className=" text-primary font-bold" size={"48"} />
                <div className="text-xl my-4">{feature.name}</div>

                <p className="text-sm font-normal text-center">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
