"use client";
import Nav from "@/components/landingpage/Nav";
import Hero from "@/components/landingpage/Hero";
import Convertsection from "@/components/landingpage/Convertsection";
import Whyus from "@/components/landingpage/Whyus";
import Image from "next/image";
import cat from "@/assets/cat.png";
import Navbar from "@/components/landingpage/Navbar";
import AboutUs from "@/components/landingpage/AboutUs";
import { useState } from "react";
import Newsletter from "@/components/landingpage/Newsletter";

export default function Home() {
  const [catActive, setCatActive] = useState(false);
  console.log("Meowwwww!! 🐱 Here is your Saucee: ")
  console.log("https://github.com/AmanApT/adest");
  
  return (
    <section className="landing-page">
      {catActive ? (
        <div className="cat-popper">
          Meoww!! Want the Source Code ? Check the console!!
        </div>
      ) : (
        <></>
      )}

      <Image
        onMouseEnter={() => {
          setCatActive(true);
        }}
        onMouseLeave={() => {
          setCatActive(false);
        }}
        className="cat"
        src={cat}
        alt="billi"
      />
      <Navbar />
      <Hero />
      <Convertsection />
      <Whyus />
      <AboutUs />
    </section>
  );
}
