"use client";
import React from "react";
import { WavyBackground } from "./ui/wavy-background";

export function Video() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <video width="750"
        src="https://drive.google.com/file/d/1iiwkUOlN9kj24E9FN6hxxRVsnI6honl6/view?usp=drive_link"
        controls
      ></video>
    </WavyBackground>
  );
}
