import { useEffect, useState } from "react";
import { socket } from "../../../App/WebSocket/Socket";
import { SOCKET_EVENTS } from "../../../App/WebSocket/Events";
import { SalaData } from "../../../Shared/Components/CardSala/Mocks/SalaMocks";
import { Sala } from "../../../Shared/Types/Entidades/Sala";

export const useLobbyWS = () => {
    const [salas, setSalas] = useState<SalaData[]>([]);

    useEffect(() => {
        const onConnect = () => {
            console.log("Conectado ao Lobby");
            socket.emit(SOCKET_EVENTS.LOBBY_JOIN);
        };

        if (!socket.connected) {
            socket.connect();
        } else {
            onConnect();
        }

        socket.on("connect", onConnect);

        // Listener para salas atualizadas via lobby
        const onLobbyUpdate = (rooms: Sala[]) => {
            const mappedRooms: SalaData[] = rooms.map(room => ({
                id: room.id,
                name: room.name,
                theme: room.theme,
                players: room.players.length,
                maxPlayers: 8
            }));
            setSalas(mappedRooms);
        };

        socket.on(SOCKET_EVENTS.LOBBY_UPDATE, onLobbyUpdate);

        return () => {
            socket.off("connect", onConnect);
            socket.off(SOCKET_EVENTS.LOBBY_UPDATE, onLobbyUpdate);
        };
    }, []);

    const createRoom = (data: { name: string; theme: string }) => {
        socket.emit(SOCKET_EVENTS.ROOM_CREATE, data);
    };

    const joinRoom = (codigo: string) => {
        socket.emit(SOCKET_EVENTS.ROOM_JOIN, { codigo });
    };

    return {
        salas,
        createRoom,
        joinRoom
    };
};
