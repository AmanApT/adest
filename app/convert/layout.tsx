import Nav from "@/components/converterpage/Nav";
import "@/app/convert/convert_layout.css";
import Footer from "@/components/Footer";

export default function ConvertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="convert-page">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
