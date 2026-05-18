import { socket } from "../../../App/WebSocket/Socket";
import { useEffect, useCallback } from "react";
import { SOCKET_EVENTS } from "../../../App/WebSocket/Events";

type DrawPayload = {
    type?: "start" | "move" | "end";
    x: number;
    y: number;
};

export const useCanvasWS = (roomId: string | null = null) => {
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
    }, []);

    /*
    |--------------------------------------------------------------------------
    | SEND DRAW
    |--------------------------------------------------------------------------
    */
    const sendDraw = useCallback((payload: DrawPayload) => {
        socket.emit(SOCKET_EVENTS.DRAW, { ...payload, room: roomId });
    }, [roomId]);

    /*
    |--------------------------------------------------------------------------
    | SEND CLEAR
    |--------------------------------------------------------------------------
    */
    const sendClear = useCallback(() => {
        socket.emit(SOCKET_EVENTS.CLEAR_DRAW, { room: roomId });
    }, [roomId]);

    /*
    |--------------------------------------------------------------------------
    | LISTEN DRAW
    |--------------------------------------------------------------------------
    */
    const onDraw = useCallback((fn: (data: DrawPayload) => void) => {
        socket.on(SOCKET_EVENTS.DRAW_UPDATE, fn);

        return () => socket.off(SOCKET_EVENTS.DRAW_UPDATE, fn);
    }, []);

    /*
    |--------------------------------------------------------------------------
    | LISTEN CLEAR
    |--------------------------------------------------------------------------
    */
    const onClear = useCallback((fn: () => void) => {
        socket.on(SOCKET_EVENTS.CLEAR_DRAW, fn);

        return () => socket.off(SOCKET_EVENTS.CLEAR_DRAW, fn);
    }, []);

    return {
        sendDraw,
        sendClear,
        onDraw,
        onClear
    };
};