"use client";
import React, { useEffect, useState } from "react";
import { WavyBackground } from "./ui/wavy-background";

import ReactPlayer from 'react-player';


export function Video() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <WavyBackground>
    <div className="flex items-center justify-center h-screen">
      <div className="player-wrapper ">
        {isMounted && (
          <ReactPlayer
            className="react-player"
            url="https://youtu.be/DqWwAAxLpTc"
            height="720px"
            width="1080px"
            controls={true}
          />
        )}
      </div>
      
    </div>
    </WavyBackground>
  );
}
