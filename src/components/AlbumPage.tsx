// "use client"
// import React from 'react'
// import EmblaCarousel from '../components/EmblaCarousel/EmblaCarousel'
// import { EmblaOptionsType } from 'embla-carousel'
// import '../embla.css'

// const OPTIONS: EmblaOptionsType = {}
// const SLIDE_COUNT = 8
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

// export default function WeddingPage() {
//   return (
//     <div className="wedding-container">
//       <EmblaCarousel slides={SLIDES} options={OPTIONS} folderName='mehendi'/>
//     </div>
//   )
// }

"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import EmblaCarousel from "./EmblaCarousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "../app/embla.css";
import { GiBigDiamondRing, GiAmpleDress  } from "react-icons/gi";
import { PiHandsPraying  } from "react-icons/pi";
import { BiPhotoAlbum } from "react-icons/bi";
import { LiaPrayingHandsSolid } from "react-icons/lia";
import { TbFeather } from "react-icons/tb";

interface AlbumPageProps {
    folderName: string;
    slideCount: number;
  }

const AlbumPage = ({ folderName, slideCount }: AlbumPageProps) => {
  const OPTIONS: EmblaOptionsType = {};
  const SLIDE_COUNT = slideCount;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  const links = [
    {
      label: "Wedding",
      href: "/wedding",
      icon: (
        <GiBigDiamondRing  className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "Pranjali Haldi",
      href: "/pranjali-haldi",
      icon: (
        <LiaPrayingHandsSolid  className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "Soumitra Haldi",
      href: "/soumitra-haldi",
      icon: (
        <PiHandsPraying className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "Mehendi",
      href: "/mehendi",
      icon: (
        <TbFeather className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "Pre-Wedding",
      href: "/pre-wedding",
      icon: (
        <GiAmpleDress className="h-5 w-5 shrink-0 text-white" />
      ),
    },
    {
      label: "Home",
      href: "/",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-white" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md bg-black md:flex-row",
        "h-[100vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div></div>
        </SidebarBody>
      </Sidebar>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} folderName={folderName} />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black " >
      <BiPhotoAlbum className="text-white text-2xl"/>
        </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white"
      >
        Wedding Album
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black " >
      <BiPhotoAlbum className="text-white text-2xl"/>
        </div>
    
    </Link>
  );
};

export default AlbumPage;
