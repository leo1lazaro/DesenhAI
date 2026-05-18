import { socket } from "./Socket";

import { SOCKET_EVENTS } from "./Events";

export const emittersGame = {

    startGame() {
        socket.emit(SOCKET_EVENTS.START_GAME);
    },

    draw(payload: unknown) {
        socket.emit(SOCKET_EVENTS.DRAW, payload);
    },

};

export const emittersChat = {

    joinChat(chatId: string) {
        socket.emit(SOCKET_EVENTS.CHAT_JOIN, { chatId });
    }
}