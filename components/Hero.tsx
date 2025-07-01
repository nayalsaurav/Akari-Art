import React from "react";
import { Hexagon } from "./Hexagon";
import { Button } from "./ui/button";
import Link from "next/link";
export const Hero = () => {
  return (
    <section className="relative z-7 mt-32 min-h-screen pb-10 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-10 gap-12 max-w-[1240px] mx-auto">
      {/* Left Content */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-white">
          Transform ideas into stunning visuals with AI
        </h1>
        <p className="text-lg md:text-xl text-gray-400 text-balance max-w-xl mx-auto lg:mx-0">
          Unleash your creativity — generate breathtaking artwork,
          illustrations, and designs effortlessly using cutting-edge AI
          technology.
        </p>
        <div className="mt-8 dark flex flex-wrap gap-6 justify-center lg:justify-start">
          <Link href={"/create"}>
            <Button
              variant="secondary"
              className="rounded-full px-6 py-2 cursor-pointer"
              aria-label="Create an AI Image"
            >
              Create Image
            </Button>
          </Link>

          <Link href={"/community"}>
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 cursor-pointer"
              aria-label="View Community Posts"
            >
              Community Posts
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-auto flex justify-center">
        <Hexagon />
      </div>
    </section>
  );
};
