"use client";
import Image from "next/image";
import convertimage from "@/assets/convertimage.jpeg";

import { useRouter } from "next/navigation";
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

  return (
    <div onClick={handleClick} className="each-convert-card">
      {/* <p className="card-img" >📃</p> */}
      <Image
        style={{ width: "6rem", height: "6rem" }}
        alt="png"
        src={convertimage}
      />
      <p className="card-title">{title}</p>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Eachconvertcard;
