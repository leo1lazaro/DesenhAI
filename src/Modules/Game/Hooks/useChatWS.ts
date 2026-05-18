
import { socket } from "../../../App/WebSocket/Socket";
import { useEffect, useState } from "react";
import { SOCKET_EVENTS }
    from "../../../App/WebSocket/Events";

export interface ChatMessage {
    id: string;
    name: string;
    message: string;
    createdAt?: string;
}

export const useChatWS = (roomId: string | null = null) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [typingUser, setTypingUser] = useState<string | null>(null);
    const [onlineUsers, setOnlineUsers] = useState(0);
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        const onConnect = () => {
            console.log("Socket conectado");
            setIsConnected(true);
            
            socket.emit(
                SOCKET_EVENTS.CHAT_JOIN,
                {
                    name: localStorage.getItem("nome"),
                    room: roomId
                }
            );

            if (roomId) {
                socket.emit(SOCKET_EVENTS.ROOM_JOIN, { roomId });
            }
        };

        const onDisconnect = () => {
            console.log("Socket desconectado");
            setIsConnected(false);
        };

        if (!socket.connected) {
            socket.connect();
        } else {
            onConnect();
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, [roomId]);

    /*
    |--------------------------------------------------------------------------
    | User Joined
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        socket.on(
            SOCKET_EVENTS.CHAT_USER_JOINED,
            (payload) => {
                console.log(payload);
            }
        );

        return () => {
            socket.off(
                SOCKET_EVENTS.CHAT_USER_JOINED
            );
        };
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Receive Messages
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        socket.on(
            SOCKET_EVENTS.CHAT_RECEIVE,
            (message: ChatMessage) => {
                setMessages(old => [
                    ...old,
                    message
                ]);
            }
        );

        return () => {

            socket.off(
                SOCKET_EVENTS.CHAT_RECEIVE
            )};
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Typing
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        socket.on(
            SOCKET_EVENTS.CHAT_TYPING,
            (payload) => {
                setTypingUser(payload.message);
                setTimeout(() => {
                    setTypingUser(null);
                }, 2000);
            }
        );
        return () => {
            socket.off(
                SOCKET_EVENTS.CHAT_TYPING
            );
        };
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Send Message
    |--------------------------------------------------------------------------
    */

    const sendMessage = (
        message: string
    ) => {
        socket.emit(
            SOCKET_EVENTS.CHAT_SEND,
            {
                message,
                name: localStorage.getItem("nome"),
                room: roomId
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Typing Event
    |--------------------------------------------------------------------------
    */
    const emitTyping = () => {
        socket.emit(
            SOCKET_EVENTS.CHAT_TYPING,
            {
                name: localStorage.getItem("nome"),
                room: roomId
            }
        );
    };

    return {
        messages,
        typingUser,
        onlineUsers,
        isConnected,
        sendMessage,
        emitTyping
    };

};