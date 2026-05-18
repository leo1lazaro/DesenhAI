import React, { useEffect, useRef, useCallback } from "react";

interface UseCanvasProps {
    width: number;
    height: number;
    emitter?: (data: {
        type: "start" | "move" | "end";
        x: number;
        y: number;
    }) => void;
}

export const useCanvas = ({ width, height, emitter }: UseCanvasProps) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawing = useRef(false);

    /*
    |--------------------------------------------------------------------------
    | INIT CANVAS
    |--------------------------------------------------------------------------
    */
    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";

        ctxRef.current = ctx;

    }, [width, height]);

    /*
    |--------------------------------------------------------------------------
    | START DRAW
    |--------------------------------------------------------------------------
    */
    const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const ctx = ctxRef.current;
        if (!ctx) return;

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        ctx.beginPath();
        ctx.moveTo(x, y);

        isDrawing.current = true;

        emitter?.({
            type: "start",
            x,
            y
        });
    }, [emitter]);

    const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing.current) return;

        const ctx = ctxRef.current;
        if (!ctx) return;

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        ctx.lineTo(x, y);
        ctx.stroke();

        emitter?.({
            type: "move",
            x,
            y
        });
    }, [emitter]);

    const stopDrawing = useCallback((e?: React.MouseEvent<HTMLCanvasElement>) => {
        const ctx = ctxRef.current;
        if (!ctx) return;

        ctx.closePath();
        isDrawing.current = false;

        if (e) {
            emitter?.({
                type: "end",
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY
            });
        }
    }, [emitter]);

    const clearCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;

        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, []);

    return {
        canvasRef,
        startDrawing,
        draw,
        stopDrawing,
        clearCanvas
    };
};