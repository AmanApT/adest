"use client";

import React, { useState, ChangeEvent } from "react";
import imageCompression from "browser-image-compression";

const ImgCompression = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

  return (
    <div>
      <h1>Image Compression</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple
      />
      {selectedFiles.length > 0 && (
        <div className="file-box">
          {selectedFiles.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      )}
      <button onClick={handleDownload}>Click here</button>
    </div>
  );
};

export default ImgCompression;
