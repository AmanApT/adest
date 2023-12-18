"use client";
import Image from "next/image";
import convertimage from "@/assets/convertimage.jpeg";

import { useRouter } from "next/navigation";
import React from "react";
interface EachconvertcardProp {
  title: string;
  description: String;
  img: String;
  svgLink: string;
}

const Eachconvertcard: React.FC<EachconvertcardProp> = ({
  title,
  description,
  img,
  svgLink
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
        {/* <Image
          style={{ width: "6rem", height: "6rem" }}
          alt="png"
          src={convertimage}
        /> */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 50 50"
        >
          <path
            d="M17.676 34.344h9.55c2.477 0 3.375-.258 4.28-.742a5.04 5.04 0 0 0 2.098-2.102c.484-.902.742-1.8.742-4.277v-9.547H44.82c1.8 0 2.453.188 3.113.54s1.176.87 1.527 1.527.54 1.31.54 3.113V44.82c0 1.8-.187 2.453-.54 3.113a3.69 3.69 0 0 1-1.527 1.527c-.66.352-1.312.54-3.113.54H22.855c-1.8 0-2.453-.187-3.113-.54s-1.172-.87-1.527-1.527-.54-1.312-.54-3.113zm0 0"
            fill-rule="evenodd"
            fill="rgb(98.431373%,93.72549%,65.882353%)"
          ></path>
          <path
            d="M43.94 37.137c0-.477-.395-.863-.883-.863s-.883.387-.883.863v3.844l-5.145-5.047c-.348-.34-.902-.34-1.25 0a.85.85 0 0 0-.258.609.86.86 0 0 0 .258.613l5.145 5.05h-3.914c-.488 0-.883.387-.883.867s.395.867.883.867h6.05c.113-.004.227-.023.336-.07a.87.87 0 0 0 .477-.465c.05-.105.066-.22.066-.332l.004-5.934zm0 0"
            fill="rgb(71.764706%,62.745098%,0.392157%)"
          ></path>
          <g fill-rule="evenodd">
            <path
              d="M5.184 0h21.988c1.8 0 2.453.188 3.113.54.652.344 1.184.88 1.527 1.53.352.656.54 1.313.54 3.113v21.984c0 1.805-.187 2.457-.54 3.117-.344.648-.875 1.184-1.527 1.527-.66.352-1.312.54-3.113.54H5.184c-1.8 0-2.457-.187-3.113-.54-.652-.344-1.184-.88-1.527-1.527C.188 29.625 0 28.973 0 27.168V5.184c0-1.8.188-2.457.54-3.113.344-.652.88-1.184 1.53-1.53S3.383 0 5.184 0zm0 0"
              fill="rgb(83.921569%,74.901961%,17.647059%)"
            ></path>
            <path
              d="M10.28 12.945v4.688c0 1.66-.926 2.66-2.707 2.66C5.406 20.293 5 18.852 5 18.07c0-.668.31-1.098.86-1.098.648 0 .813.504.813 1.05 0 .516.242.89.88.89.594 0 .926-.44.926-1.3V12.95c0-.54.352-.898.902-.898s.902.36.902.898zm1.672 6.402v-6.102c0-.8.418-1.055 1.055-1.055h2.762c1.516 0 2.738.75 2.738 2.508 0 1.44-1 2.508-2.75 2.508h-2v2.152c0 .54-.355.902-.902.902s-.902-.363-.902-.902zm1.805-5.773v2.242h1.68c.727 0 1.266-.437 1.266-1.12 0-.793-.56-1.12-1.45-1.12zm13.285 3.1v2.984c0 .332-.254.602-.613.602-.52 0-.66-.32-.773-1.023-.516.648-1.23 1.066-2.352 1.066-2.793 0-3.863-1.926-3.863-4.145 0-2.676 1.672-4.148 4.125-4.148 2.004 0 3.07 1.2 3.07 1.902 0 .63-.46.793-.848.793-.89 0-.56-1.242-2.32-1.242-1.242 0-2.223.813-2.223 2.816 0 1.56.77 2.637 2.246 2.637.957 0 1.793-.648 1.88-1.617H24.2c-.383 0-.812-.14-.812-.69 0-.44.254-.69.703-.69h2.223c.527 0 .738.262.738.758zm0 0"
              fill="rgb(100%,100%,100%)"
            ></path>
          </g>
        </svg> */}
            <div dangerouslySetInnerHTML={{ __html: svgLink }} />
        <p className="card-title">{title}</p>
        <p className="card-description">{description}</p>
      </div>
      {/* <p className="card-img" >📃</p> */}
    </div>
  );
};

export default Eachconvertcard;
