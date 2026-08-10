import { useRef, useState } from "react";
import Cropper from "react-cropper";

import useTranslation from "../../../hooks/useTranslation";
import { cn } from "../../../utils/general";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const OCRImageUploader = ({
  onParsedResults,
  isProcessing,
  setIsProcessing,
}) => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const cropperRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleProcessOcr = async () => {
    if (!cropperRef.current) return;
    const cropper = cropperRef.current.cropper;

    cropper.getCroppedCanvas().toBlob(async (blob) => {
      if (!blob) return;

      setIsProcessing(true);
      const formData = new FormData();
      formData.append("file", blob, "cropped_respawn.png");

      try {
        const response = await fetch(`${API_BASE_URL}/api/ocr/parse-respawn`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.status === "success") {
          onParsedResults(result.data);
        } else {
          console.error("Recognise error: " + result.message);
        }
      } catch (err) {
        console.error("Backend OCR error:", err);
      } finally {
        setIsProcessing(false);
      }
    });
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
      <h2 className="text-lg font-extrabold text-sky-400">
        📷 {t.respawnAdmin.ocrCardTitle}
      </h2>

      <input
        type="file"
        accept="image/*"
        lang="en"
        onChange={handleImageChange}
        className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0
          file:text-xs file:font-semibold file:bg-slate-800 file:text-sky-400
          hover:file:bg-slate-700 cursor-pointer"
      />

      {image && (
        <div className="flex flex-col gap-4">
          <div className="w-full h-96 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
            <Cropper
              src={image}
              style={{ height: "100%", width: "100%" }}
              initialAspectRatio={NaN}
              guides={true}
              ref={cropperRef}
              viewMode={1}
              dragMode="move"
              movable={false}
              zoomable={true}
              scalable={true}
              cropBoxMovable={true}
              cropBoxResizable={true}
              background={false}
              responsive={true}
              autoCropArea={0.8}
              lang="eng"
            />
          </div>

          <button
            type="button"
            onClick={handleProcessOcr}
            disabled={isProcessing}
            className={cn(
              "w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl",
              "transition shadow-lg shadow-sky-500/10 cursor-pointer disabled:opacity-50",
            )}
          >
            {isProcessing
              ? t.respawnAdmin.ocrProcessing
              : t.respawnAdmin.cropConfirmBtn}
          </button>
        </div>
      )}
    </div>
  );
};

export default OCRImageUploader;
