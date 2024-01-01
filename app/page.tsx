"use client";

import { useDraw } from "@/hooks/useDraw";

export default function Home() {
  const { canvasRef, onMouseDown } = useDraw(DrawLine);

  function DrawLine({ previousPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = "orange";
    const lineWidth = 5;

    let startPoint = previousPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={650}
        height={650}
        className="border border-black rounded-md"
      />
    </div>
  );
}
