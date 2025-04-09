import React from "react";
import { Vortex } from "./ui/vortex";

export function VortexDemo() {
  return (
    <div className="w-full mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          5th May 2024
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
        On this day we joyfully tied the knot, surrounded by our closest family and friends. The day was filled with pure magic and unforgettable memories.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 py-2 bg-purple-800 hover:bg-purple-950 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Watch Video
          </button>
          
        </div>
      </Vortex>
    </div>
  );
}
