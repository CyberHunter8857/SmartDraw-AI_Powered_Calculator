import React from 'react';
import { useEffect, useState, useRef } from 'react';

export default function CanvasBoard({
  currentColor,
  brushSize = 3,
  resetSignal,
  onReady,
}) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const needResize = canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr;
    if (needResize) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    resizeCanvas();
    onReady?.(canvas);
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    if (resetSignal) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [resetSignal]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
  };
  
  const start = (e) => {
    e.preventDefault(); // Prevent default touch behavior on mobile
    drawing.current = true;
    last.current = getPos(e);
  };

  const move = (e) => {
    if (!drawing.current) return;
    e.preventDefault(); // Prevent default touch behavior on mobile

    const ctx = canvasRef.current.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    
    // Adjust brush size for mobile devices
    const isMobile = 'ontouchstart' in window;
    const adjustedBrushSize = isMobile ? Math.max(brushSize, 4) : brushSize;
    ctx.lineWidth = adjustedBrushSize;

    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last.current = { x, y };
  };

  const end = (e) => {
    if (e) e.preventDefault(); // Prevent default touch behavior on mobile
    drawing.current = false;
  };

  return (
    <div className="h-[calc(100vh-120px)] sm:h-[calc(100vh-96px)] w-full bg-neutral-900">
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-crosshair touch-none"
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
        style={{ touchAction: 'none' }} // Prevent scrolling while drawing on mobile
      />
    </div>
  );
}
