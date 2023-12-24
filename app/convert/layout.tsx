import Nav from "@/components/converterpage/Nav";
import "@/app/convert/convert_layout.css";

export default function ConvertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="convert-page">
      <Nav />
      {children}
    </div>
  );
}
