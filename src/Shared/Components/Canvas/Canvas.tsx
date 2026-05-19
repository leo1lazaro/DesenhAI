import React from "react";
import "./Canvas.css";
import { Trash2, MousePointer2 } from "lucide-react";

interface CanvasProps {
    width?: number;
    height?: number;
    emitter?: (data: {
        type: "start" | "move" | "end";
        x: number;
        y: number;
    }) => void;

    limpar: () => void;

    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    startDrawing: any;
    draw: any;
    stopDrawing: any;
    disabled?: boolean;
}

const Canvas = ({
    width = 600,
    height = 400,
    limpar,
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    disabled = false
}: CanvasProps) => {

    return (
        <section className={`Canvas-container ${disabled ? 'disabled' : ''}`}>
            <div className="Canvas-controls">
                <div className="Canvas-indicator">
                    <div className="Canvas-indicator-dot" style={{ background: disabled ? '#94a3b8' : '#22c55e' }} />
                    <MousePointer2 size={14} />
                    <span>{disabled ? 'Observando' : 'Quadro de Desenho'}</span>
                </div>
                <button 
                  className="Canvas-btn-clear" 
                  onClick={limpar}
                  disabled={disabled}
                >
                    <Trash2 size={16} />
                    Limpar
                </button>
            </div>

            <canvas
                className="Canvas-board"
                ref={canvasRef}
                width={width}
                height={height}
                onPointerDown={disabled ? undefined : startDrawing}
                onPointerMove={disabled ? undefined : draw}
                onPointerUp={disabled ? undefined : stopDrawing}
                onPointerLeave={disabled ? undefined : stopDrawing}
                style={{ 
                    cursor: disabled ? 'default' : undefined,
                    pointerEvents: disabled ? 'none' : 'auto',
                    touchAction: 'none'
                }}
            />
        </section>
    );
};

export default Canvas;