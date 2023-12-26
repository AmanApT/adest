"use client";

import React, { useState, ChangeEvent, DragEvent } from "react";
import imageCompression from "browser-image-compression";
import "@/components/converterpage/ImageCompress.css";
import "@/components/converterpage/Jpgtopdf.css";

import CancelIcon from "@mui/icons-material/Cancel";

const ImgCompression = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);


  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const compressedFiles = await Promise.all(
        Array.from(files).map(async (file) => {
          return await compressImage(file);
        })
      );

      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...compressedFiles,
      ]);
    }
  };

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(file, options);

      // Create a File object from the compressed blob
      const compressedFile = new File([compressedBlob], file.name, {
        type: compressedBlob.type,
        lastModified: Date.now(),
      });

      return compressedFile;
    } catch (error) {
      console.error("Image compression failed:", error);
      return file; // Return the original file if compression fails
    }
  };

  const handleDownload = () => {
    // Create a zip file or initiate individual downloads as needed
    // You can implement this based on your server-side logic or use client-side libraries

    // For example, initiating individual downloads:
    selectedFiles.forEach((file) => {
      const downloadLink = document.createElement("a");
      const url = URL.createObjectURL(file);

      downloadLink.href = url;
      downloadLink.download = file.name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
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

  const handleDeleteFile = (index: number) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  return (
    <div
      className={`compress-parent ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <h1>Image Compression</h1>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        style={{ display: "none" }}
      />

      <button className="jpg-to-pdf-convert-btn" onClick={handleClick}>
        {selectedFiles.length > 0 ? "Add More Files" : "Select JPG Files"}
      </button>

      {/* {selectedFiles.length > 0 && (
        <div className="file-box">
          {selectedFiles.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      )} */}

      {selectedFiles[0] ? <></> : <p>Or Drop JPG here</p>}
      {selectedFiles.length > 0 && (
        <div className="file-box">
          {selectedFiles.map((file, index) => (
            <>
              <div className="selected-image-container">
                <div
                  key={index}
                  className="each-file"
                  style={{ cursor: "default" }}
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
            </>
          ))}
        </div>
      )}

      {selectedFiles[0] ? (
        <button className="convert-button" onClick={handleDownload}>
          Convert
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImgCompression;
