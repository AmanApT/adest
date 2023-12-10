"use client"
import Nav from "@/components/converterpage/Nav";
import "@/app/convert/convert.css";
import Main from "@/components/converterpage/Main";
import { useParams } from 'next/navigation';

const CardDetail = () => {
  const {title} = useParams();
  return (
    <div className="convert-page">
    <Nav />
    <Main />
  </div>
  );
};

export default CardDetail;
