"use client";
import Nav from "@/components/converterpage/Nav";
import "@/app/[...title]/convert.css";
import Jpgtopdf from "@/components/converterpage/Jpgtopdf";
import { useParams, useRouter } from "next/navigation";
import Wrongroute from "@/components/wrongroute/Wrongroute";

const CardDetail = () => {
  const allowedTitles = [
    "jpgtopdf",
    "pngtopdf",
    "wordtopdf",
    "exceltopdf",
    "presentationtopdf",
    "pdftopdf",
  ];

  const { title } = useParams();
  console.log(title);

  const router = useRouter();
  if (allowedTitles.includes(title[0] as string)) {
    return (
      <div className="convert-page">
        <Nav />
        {title[0] === "jpgtopdf" && <Jpgtopdf />}
      </div>
    );
  } else
    return (
      <>
        <Wrongroute />
      </>
    );
};

export default CardDetail;
