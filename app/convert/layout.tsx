import Nav from "@/components/converterpage/Nav";
import "@/app/convert/convert_layout.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/landingpage/Navbar";

export default function ConvertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="convert-page">
      {/* <Nav /> */}
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
