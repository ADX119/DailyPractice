'use client';

import { useEffect, useRef, useState } from "react";

type ScratchCardProps = {
  width?: number;
  height?: number;
  brushSize?: number;
  revealThreshold?: number;
  onComplete?: () => void;
  revealImage: string; // 👈 image to reveal
};

export default function ScratchCard({
  width = 320,
  height = 200,
  brushSize = 22,
  revealThreshold = 60,
  onComplete,
  revealImage,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = width;
    canvas.height = height;

    // Scratch layer (mask)
    ctx.fillStyle = "#9ca3af"; // gray
    ctx.fillRect(0, 0, width, height);
  }, [width, height]);

  const getPos = (
    e: React.MouseEvent | React.TouchEvent
  ) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const erase = (x: number, y: number) => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const getScratchedPercent = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    const pixels = ctx.getImageData(0, 0, width, height).data;

    let cleared = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) cleared++;
    }

    return (cleared / (width * height)) * 100;
  };

  const handleMove = (
    e: React.MouseEvent | React.TouchEvent
  ) => {
    if (!isDrawing.current || completed) return;
    e.preventDefault();

    const { x, y } = getPos(e);
    erase(x, y);

    const percent = getScratchedPercent();
    if (percent >= revealThreshold) {
      setCompleted(true);
      onComplete?.();
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl select-none"
      style={{ width, height }}
    >
      {/* 🖼️ Revealed Image */}
      <img
        src={"/pic.jpg"}
        alt="Revealed"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Scratch Mask */}
      {!completed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 cursor-pointer"
          onMouseDown={() => (isDrawing.current = true)}
          onMouseUp={() => (isDrawing.current = false)}
          onMouseLeave={() => (isDrawing.current = false)}
          onMouseMove={handleMove}
          onTouchStart={() => (isDrawing.current = true)}
          onTouchEnd={() => (isDrawing.current = false)}
          onTouchMove={handleMove}
        />
      )}
    </div>
  );
}
