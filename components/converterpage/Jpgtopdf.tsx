"use client";
import "@/components/converterpage/Jpgtopdf.css";
import { ChangeEvent, DragEvent, useState } from "react";
import { convertImageToPDF } from "@/utils/imgtopdf";
import jsPDF from "jspdf";
import { usePathname, useRouter } from "next/navigation";

import CancelIcon from "@mui/icons-material/Cancel";

const Jpgtopdf = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const handleClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
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
    console.log(files);

    if (files && files.length > 0) {
      // Update selectedFiles with the new files
      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...Array.from(files),
      ]);
    }
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    if (event.dataTransfer.types.includes("Files")) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleConvertClick = async () => {
    if (selectedFiles.length > 0) {
      const pdf = new jsPDF();

      // Define padding values
      const paddingX = 0;
      const paddingY = 20;

      // Calculate new dimensions considering padding
      const pdfWidth = 210 - 2 * paddingX;
      const pdfHeight = 297 - 2 * paddingY;

      // Create an array of promises for fetching image data URLs
      const imgDataUrlPromises = selectedFiles.map(async (file) => {
        return await convertImageToPDF(file);
      });

      // Wait for all promises to resolve
      const imgDataUrls = await Promise.all(imgDataUrlPromises);

      // Create an array of promises for loading Image objects
      const imgLoadPromises = imgDataUrls.map(
        (imgDataUrl) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = imgDataUrl;
          })
      );

      // Wait for all Image objects to load
      const images = await Promise.all(imgLoadPromises);
      console.log(images);

      // Iterate through selected files and add each image to the PDF
      for (let i = 0; i < images.length; i++) {
        const img = images[i];

        // Calculate scaled dimensions maintaining the aspect ratio
        const aspectRatio = img.width / img.height;
        const width = pdfWidth;
        const height = pdfWidth / aspectRatio;

        const y = (pdfHeight - height) / 2 + paddingY;

        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage({
          imageData: img.src,
          format: "JPEG",
          x: paddingX,
          y: y,
          width: width,
          height: height,
        });
      }

      pdf.save("output.pdf");
    }
  };

  const handleDeleteFile = (index: number) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  // Handle drag events for each page 🔽
  const handleDragStart = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.dataTransfer.setData("text/plain", String(index));
    setDraggedIndex(index);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    if (index !== draggedIndex) {
      const updatedFiles = [...selectedFiles];
      const draggedItem = updatedFiles.splice(draggedIndex!, 1)[0];
      updatedFiles.splice(index, 0, draggedItem);
      setSelectedFiles(updatedFiles);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div
      className={`convert-main ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {pathname == "/convert/jpgtopdf" ? (
        <h1 className="convert-heading">JPG to PDF</h1>
      ) : pathname == "/convert/webptopdf" ? (
        <h1 className="convert-heading">WEBP to PDF</h1>
      ) : (
        <h1 className="convert-heading">PNG to PDF</h1>
      )}
      {pathname == "/convert/jpgtopdf" ? (
        <p className="convert-sub-heading">
          Convert each JPG page into a PDF in just a click
        </p>
      ) : (
        <p className="convert-sub-heading">
          Convert each PNG page into a PDF in just a click
        </p>
      )}

      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />
      {selectedFiles[0] ? (
        <></>
      ) : (
        <button className="jpg-to-pdf-convert-btn" onClick={handleClick}>
          Select JPG Files
        </button>
      )}
      {selectedFiles[0] ? <></> : <p>Or Drop JPG here</p>}
      {selectedFiles.length > 0 && (
        <div className="file-box">
          {/* <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul> */}
          {selectedFiles.map((file, index) => (
            <>
              <div className="selected-image-container">
                <div
                  key={index}
                  className="each-file"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <CancelIcon
                    onClick={() => handleDeleteFile(index)}
                    className="close-icon"
                    color="error"
                  />

                  <div className="each-file-bg"></div>
                </div>
                {file.name.substring(0, 15)}
              </div>
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
          Add More
        </button>
      )}
      {selectedFiles[0] ? (
        <button className="convert-button" onClick={handleConvertClick}>
          Convert
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Jpgtopdf;
