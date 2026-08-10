import { useRef, useState } from "react";
import { createWorker } from "tesseract.js";

import useTranslation from "../../../hooks/useTranslation";
import { cn } from "../../../utils/general";

const OCRImageUploader = ({
  onParsedResults,
  isProcessing,
  setIsProcessing,
}) => {
  const { t } = useTranslation();
  const [imageSrc, setImageSrc] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  // Canvas and Selection state
  const imageRef = useRef(null);
  const [crop, setCrop] = useState({ x: 10, y: 10, width: 80, height: 80 }); // Percentages
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleFileSelect = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropModal(true);
      setCrop({ x: 10, y: 10, width: 80, height: 80 });
    };
    reader.readAsDataURL(file);
  };

  // Handle Dragging / Resizing Selection Box
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const startXPercent = Math.max(
      0,
      Math.min(100, (dragStart.x / rect.width) * 100),
    );
    const startYPercent = Math.max(
      0,
      Math.min(100, (dragStart.y / rect.height) * 100),
    );
    const currentXPercent = Math.max(
      0,
      Math.min(100, (currentX / rect.width) * 100),
    );
    const currentYPercent = Math.max(
      0,
      Math.min(100, (currentY / rect.height) * 100),
    );

    const x = Math.min(startXPercent, currentXPercent);
    const y = Math.min(startYPercent, currentYPercent);
    const width = Math.abs(currentXPercent - startXPercent);
    const height = Math.abs(currentYPercent - startYPercent);

    if (width > 2 && height > 2) {
      setCrop({ x, y, width, height });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Crop image physically using HTML5 Canvas & send to OCR
  const processCroppedImage = async () => {
    if (!imageRef.current) return;

    try {
      setShowCropModal(false);
      setIsProcessing(true);

      const img = imageRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Calculate actual pixel bounds based on crop percentages
      const cropX = (crop.x / 100) * img.naturalWidth;
      const cropY = (crop.y / 100) * img.naturalHeight;
      const cropWidth = (crop.width / 100) * img.naturalWidth;
      const cropHeight = (crop.height / 100) * img.naturalHeight;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      // Draw only the selected cropped area to canvas
      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight,
      );

      // Convert cropped canvas to Blob for OCR
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const worker = await createWorker("eng");
        const {
          data: { text },
        } = await worker.recognize(blob);
        await worker.terminate();

        onParsedResults(text);
      }, "image/png");
    } catch (err) {
      console.error("OCR Processing Error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file);
    }
  };

  return (
    <>
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
        <h2 className="text-lg font-extrabold text-sky-400">
          {t.respawnAdmin.ocrCardTitle}
        </h2>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed border-slate-700 rounded-xl p-6 text-center cursor-pointer",
            "hover:border-sky-500 hover:bg-slate-950/40 transition flex flex-col items-center justify-center gap-2",
            isProcessing && "opacity-50 pointer-events-none",
          )}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />

          <span className="text-3xl">🖼️</span>
          <span className="text-xs text-slate-400 font-medium">
            {t.respawnAdmin.ocrDropzoneText}
          </span>
        </div>

        {isProcessing && (
          <div className="text-xs text-amber-400 font-semibold animate-pulse text-center">
            ⚡ {t.respawnAdmin.ocrProcessing}
          </div>
        )}
      </div>

      {/* Modal Interactive Cropper */}
      {showCropModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center
          justify-center p-4"
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden
            flex flex-col shadow-2xl max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">
                {t.respawnAdmin.cropModalTitle}
              </h3>
              <button
                type="button"
                onClick={() => setShowCropModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Interactive Image Cropper Area */}
            <div className="p-4 flex items-center justify-center overflow-auto max-h-[65vh] bg-slate-950 select-none">
              <div
                className="relative inline-block cursor-crosshair overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Source"
                  className="max-w-full max-h-[60vh] object-contain pointer-events-none"
                />

                {/* Crop Selection Rectangle Overlay */}
                <div
                  className="absolute border-2 border-sky-400 bg-sky-500/20 shadow-outline cursor-move"
                  style={{
                    left: `${crop.x}%`,
                    top: `${crop.y}%`,
                    width: `${crop.width}%`,
                    height: `${crop.height}%`,
                  }}
                >
                  <span
                    className="absolute -top-5 left-0 bg-sky-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5
                    rounded"
                  >
                    {t.respawnAdmin.selectedArea}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 border-t border-slate-800 flex justify-between items-center gap-4 bg-slate-900">
              <span className="text-xs text-slate-400">
                {t.respawnAdmin.cropInstruction}
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCropModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300
                    transition cursor-pointer"
                >
                  {t.respawnAdmin.cropCancelBtn}
                </button>
                <button
                  type="button"
                  onClick={processCroppedImage}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950
                    transition cursor-pointer"
                >
                  {t.respawnAdmin.cropConfirmBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OCRImageUploader;
