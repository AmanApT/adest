"use client";
import { ChangeEvent, useState } from "react";
import {
  srcToWebP,
  blobToWebP,
  arrayBufferToWebP,
} from "webp-converter-browser";

const Jpgtowebp = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("webp");
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(
    null
  );

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

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleConvertClick}>Convert to WebP</button>

      {convertedImageUrl && (
        <img src={convertedImageUrl} alt="Converted Image" />
      )}
    </div>
  );
};

export default Jpgtowebp;
