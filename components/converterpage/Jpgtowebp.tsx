"use client";
import { ChangeEvent, DragEvent, useState } from "react";
import {
  srcToWebP,
  blobToWebP,
  arrayBufferToWebP,
} from "webp-converter-browser";
import "@/components/converterpage/Jpgtopdf.css";
import "@/components/converterpage/ImageCompress.css";

import CancelIcon from "@mui/icons-material/Cancel";

const Jpgtowebp = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // const [outputFormat, setOutputFormat] = useState<string>("webp");
  // const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(
  //   null
  // );
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedImage(file || null);
  };

  const handleConvertClick = async () => {
    if (selectedImage) {
      try {
        let webpBlob: Blob;

        if (selectedImage.type.startsWith("image/")) {
          webpBlob = await blobToWebP(selectedImage, { quality: 0.75 });
        } else {
          throw new Error("Unsupported file type");
        }

        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(webpBlob);
        downloadLink.download = `converted_image.webp`;
        downloadLink.style.display = "none";

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
      } catch (error) {
        console.error("Image conversion failed:", error);
      }
    }
  };

  const handleDeleteFile = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.value = "";

    setSelectedImage(null);
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }

    setIsDragging(false);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    if (event.dataTransfer.types.includes("Files")) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`compress-parent ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput"
      />
      <button className="jpg-to-pdf-convert-btn" onClick={handleClick}>
        Select JPG Files
      </button>

      {selectedImage == null ? <p>Or Drop JPG here</p> : <></>}

      {selectedImage && (
        <div className="selected-image-container">
          <div
            // key={index}
            className="each-file"
            style={{ cursor: "default" }}
          >
            <CancelIcon
              onClick={handleDeleteFile}
              className="close-icon"
              color="error"
            />

            <div className="each-file-bg"></div>
          </div>
          {selectedImage.name.substring(0, 15)}
        </div>
      )}
      {/* <button onClick={handleConvertClick}>Convert to WebP</button> */}
      {selectedImage && (
        <button className="convert-button" onClick={handleConvertClick}>
          Convert
        </button>
      )}
      {/* {convertedImageUrl && (
        <img src={convertedImageUrl} alt="Converted Image" />
      )} */}
    </div>
  );
};

export default Jpgtowebp;
