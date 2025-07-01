"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import { saveAs } from "file-saver";
import Image from "next/image";

interface CardProps {
  name: string;
  prompt: string;
  photo: string;
}

const Card = ({ name, prompt, photo }: CardProps) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    if (window.innerWidth < 768) {
      setShowOverlay(!showOverlay);
    }
  };

  return (
    <div
      className="rounded-xl group transition-all duration-500 relative shadow-card hover:shadow-cardhover card"
      onClick={toggleOverlay}
    >
      <Image
        src={photo}
        alt={prompt}
        className="w-full h-full object-cover rounded-xl"
        width={400}
        height={500}
      />
      <div
        className={`${
          showOverlay ? "flex" : "hidden"
        } group-hover:flex flex-col max-h-[94.5%] absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md`}
      >
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            className="outline-none bg-transparent cursor-pointer border-none"
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing overlay on download
              saveAs(photo, `downloaded-image.png`);
            }}
          >
            <Download />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
