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
    <div className="">
      <div className=" md:flex-row flex-col items-center flex  container justify-center pb-10">
        <div className="p-5 justify-center">
          <div className=" bg-gradient-to-r  from-primary/100 to-gradaint/80 bg-clip-text text-transparent text-4xl md:text-6xl font-bold pb-10 ">
            From startup to enterprise, Bird is built for every type of
            business.
          </div>
          <div className="text-2xl mb-8">
            Built for all businesses and communities, Bird is the only platform
            you need to grow your business.
          </div>
          <Button size={"lg"} aria-label="get started Button">
            Get Started
          </Button>
        </div>
      </div>

      <div className="flex-col items-center justify-center">
        <div className=" text-3xl flex justify-center md:text-5xl font-bold pt-5 pb-10 bg-gradient-to-r  from-primary  to-gradaint bg-clip-text text-transparent">
          Product Features
        </div>

        <div className="grid grid-cols-1 p-4 md:grid md:grid-cols-3 gap-4 md:gap-10 my-2  md:my-8 md:px-40">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex-col space-y-6 pb-10 
                        p-8  items-center justify-center w-full"
            >
              <div className="text-3xl font-bold flex flex-col justify-center items-center">
                <feature.icon className=" text-primary font-bold" size={"48"} />
                <div className="text-2xl my-4">{feature.name}</div>

                <p className=" text-sm font-normal text-center">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
