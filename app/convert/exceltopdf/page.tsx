// import React from 'react'
import cat from "@/assets/cat.png";
import Image from "next/image";

const page = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop:"4rem",
        // gap:"1rem",
        // justifyContent: "center",
        flexDirection:"column"

      }}
    >
      <Image className="cat-not-found" src={cat} alt="billi" />
      <h1 style={{ color: "var(--stroke)",textAlign:"center" }}>This page is still under work 🔨</h1>
    </div>
  );
};

export default page;
