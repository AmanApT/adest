import Nav from "@/components/landingpage/Nav";
import Hero from "@/components/landingpage/Hero";
import Convertsection from "@/components/landingpage/Convertsection";
import Whyus from "@/components/landingpage/Whyus";
import Image from "next/image";
import cat from "@/assets/cat.png";
import Navbar from "@/components/landingpage/Navbar";
import AboutUs from "@/components/landingpage/AboutUs";

export default function Home() {
  return (
    <section className="landing-page">
      <Image className="cat" src={cat} alt="billi" />
      {/* <Nav /> */}
      <Navbar />
      <Hero />
      <Convertsection />
      <Whyus />
      <AboutUs />
    </section>
  );
}
