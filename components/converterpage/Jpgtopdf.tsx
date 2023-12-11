"use client";
import { useParams } from "next/navigation";
import "@/components/converterpage/Jpgtopdf.css";
import { ChangeEvent, DragEvent, useState } from "react";
import { convertImageToPDF } from "@/utils/imgtopdf";
import jsPDF from "jspdf";

const Jpgtopdf = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const { title } = useParams();

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // const updatedFiles: File[] = [];

      // for (let i = 0; i < files.length; i++) {
      //   const file = files[i] as CustomFile;
      //   const imgDataUrl: string = await convertImageToPDF(file);

      //   updatedFiles.push({
      //     ...file,
      //     imgUrl: imgDataUrl,
      //   });
      // }

      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...Array.from(files),
      ]);
    }
  };

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;

    if (files && files.length > 0) {
      // Update selectedFiles with the new files
      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...Array.from(files),
      ]);
    }
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleConvertClick = async () => {
    if (selectedFiles.length > 0) {
      const pdf = new jsPDF();

      // Define padding values
      const paddingX = 20;
      const paddingY = 20;

      // Calculate new dimensions considering padding
      const pdfWidth = 210 - 2 * paddingX;
      const pdfHeight = 297 - 2 * paddingY;

      // Iterate through selected files and add each image to the PDF
      for (let i = 0; i < selectedFiles.length; i++) {
        const imgDataUrl: string = await convertImageToPDF(selectedFiles[i]);
        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage({
          imageData: imgDataUrl,
          format: "JPEG",
          x: paddingX,
          y: paddingY,
          width: pdfWidth,
          height: pdfHeight,
        });
      }

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
        multiple
      />
      <button className="get-started-btn-hero" onClick={handleClick}>
        Press Me
      </button>
      {selectedFiles.length > 0 && (
        <div>
          {/* <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul> */}
          {selectedFiles.map((file, index) => (
            <>
              <div key={index}>{file.name}</div>
              {/* <img
                src={file.imgUrl}
                alt="Image Preview"
                height={200}
                width={200}
              />
              <div>{file.imgUrl}</div> */}
            </>
          ))}
        </div>
      )}
      {/* <button onClick={() => console.log(selectedFile)}>Hiii</button> */}
      {selectedFiles.length === 0 ? (
        <></>
      ) : (
        <button
          className="add-files-btn"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          Add More Files
        </button>
      )}
      <button onClick={handleConvertClick}>Hiii</button>
    </div>
  );
};

export default Jpgtopdf;
