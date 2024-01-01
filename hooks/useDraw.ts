"use client";

import { useEffect, useRef, useState } from "react";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, previousPoint }: Draw) => void
) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousRef = useRef<null | Point>(null);

  const onMouseDown = () => setMouseDown(true);

  useEffect(() => {
    const canvaCurrent = canvasRef.current;
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;

      //   console.log({ x: e.clientX, y: e.clientY });
      const currentCordinates = computeCanvasPosition(e);

      //   console.log(currentCordinates);

      const ctx = canvaCurrent?.getContext("2d");
      if (!ctx || !currentCordinates) return;

      onDraw({
        ctx,
        currentPoint: currentCordinates,
        previousPoint: previousRef.current,
      });

      previousRef.current = currentCordinates;
    };

    // to get the current canvas position
    const computeCanvasPosition = (e: MouseEvent) => {
      if (!canvaCurrent) return;

      const rect = canvaCurrent?.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y };
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
      previousRef.current = null;
    };

    //Add event listner
    canvasRef.current?.addEventListener("mousemove", handler);
    window.addEventListener("mouseup", mouseUpHandler);

    // clear the event listener
    return () => {
      canvaCurrent?.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [onDraw, mouseDown]);

  return { canvasRef, onMouseDown };
};
