import { useEffect, useState } from "react";
import { socket } from "../../../App/WebSocket/Socket";
import { SOCKET_EVENTS } from "../../../App/WebSocket/Events";
import { Sala } from "../../../Shared/Types/Entidades/Sala";

export const useRoomWS = (roomId: string | null = null) => {
    const [room, setRoom] = useState<Sala | null>(null);

    useEffect(() => {
        const onConnect = () => {
            if (roomId) {
                socket.emit(SOCKET_EVENTS.ROOM_JOIN, { roomId });
            }
        };

        if (!socket.connected) {
            socket.connect();
        } else {
            onConnect();
        }

        socket.on("connect", onConnect);

        const onRoomData = (roomData: Partial<Sala>) => {
            console.log("Room updated:", roomData);
            setRoom(prev => prev ? { ...prev, ...roomData } : roomData as Sala);
        };

        socket.on(SOCKET_EVENTS.ROOM_UPDATED, onRoomData);
        socket.on(SOCKET_EVENTS.ROOM_STATE_UPDATE, onRoomData);
        socket.on(SOCKET_EVENTS.ROOM_ROUND_NEXT, onRoomData);

        return () => {
            socket.off("connect", onConnect);
            socket.off(SOCKET_EVENTS.ROOM_UPDATED, onRoomData);
            socket.off(SOCKET_EVENTS.ROOM_STATE_UPDATE, onRoomData);
            socket.off(SOCKET_EVENTS.ROOM_ROUND_NEXT, onRoomData);
        };
    }, [roomId]);

    const startGame = () => {
        if (roomId) {
            socket.emit(SOCKET_EVENTS.ROOM_START_GAME, { roomId });
        }
    };

    const updateRoom = (data: Partial<Sala>) => {
        if (roomId) {
            socket.emit(SOCKET_EVENTS.ROOM_UPDATED, { roomId, ...data });
        }
    };

    const leaveRoom = () => {
        if (roomId) {
            socket.emit(SOCKET_EVENTS.ROOM_LEAVE, { roomId });
        }
    };

    return {
        room,
        startGame,
        updateRoom,
        leaveRoom
    };
};
