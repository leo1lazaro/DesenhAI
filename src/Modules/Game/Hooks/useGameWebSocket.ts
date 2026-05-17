import { useEffect } from "react";
import { socket } from "../../../App/WebSocket/Socket";
import { registerSocketListeners } from "../../../App/WebSocket/Listeners";

export function useGameWebSocket() {

    useEffect

    useEffect(() => {
        socket.connect();
        registerSocketListeners();

        return () => {
            socket.removeAllListeners();
            socket.disconnect();
        }
    }, []);

}