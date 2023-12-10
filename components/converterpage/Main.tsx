"use client";
import { useParams } from "next/navigation";
import "@/components/converterpage/Main.css";
import { ChangeEvent, DragEvent, useState } from "react";
import { convertImageToPDF } from "@/utils/imgtopdf";
import jsPDF from "jspdf";

const Main = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { title } = useParams();

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    setSelectedFile(file || null);
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleConvertClick = async () => {
    if (selectedFile) {
      const pdf = new jsPDF();
      const imgDataUrl: string = await convertImageToPDF(selectedFile);

      pdf.addImage({
        imageData: imgDataUrl,
        format: "JPEG",
        x: 0,
        y: 0,
        width: 210,
        height: 297,
      });

      pdf.save("output.pdf");
    }
  };

  return (
    <div
      className={`convert-main ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <h1>{title}</h1>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button className="get-started-btn-hero" onClick={handleClick}>
        Press Me
      </button>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      {/* <button onClick={() => console.log(selectedFile)}>Hiii</button> */}
      <button onClick={handleConvertClick}>Hiii</button>
    </div>
  );
};

export default Main;
