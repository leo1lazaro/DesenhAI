import { socket } from "./Socket";

import { SOCKET_EVENTS }
    from "./Events";

export function registerSocketListeners() {

    socket.on(SOCKET_EVENTS.CONNECT,() => {
            console.log("Socket conectado");
        }
    );

    socket.on(
        SOCKET_EVENTS.DISCONNECT,() => {
            console.log("Socket desconectado");
        }
    );

}