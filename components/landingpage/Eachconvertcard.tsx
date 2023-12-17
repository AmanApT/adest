"use client";
import Image from "next/image";
import convertimage from "@/assets/convertimage.jpeg";

import { useRouter } from "next/navigation";
import React from "react";
interface EachconvertcardProp {
  title: string;
  description: String;
  img: String;
}

const Eachconvertcard: React.FC<EachconvertcardProp> = ({
  title,
  description,
  img,
}) => {
  const router = useRouter();
  const handleClick = () => {
    const newTitle = title.split(" ").join("").toLowerCase();
    console.log(newTitle);

    router.push(`/${newTitle}`);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLDivElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      onClick={handleClick}
      className="each-convert-card"
      onMouseMove={handleMouseMove}
    >
      <div className="card-border"></div>
      <div className="card-content">
        <Image
          style={{ width: "6rem", height: "6rem" }}
          alt="png"
          src={convertimage}
        />
        <p className="card-title">{title}</p>
        <p className="card-description">{description}</p>
      </div>
      {/* <p className="card-img" >📃</p> */}
    </div>
  );
};

export default Eachconvertcard;
