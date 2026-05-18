import { useEffect, useState } from "react";
import { socket } from "../../../App/WebSocket/Socket";
import { SOCKET_EVENTS } from "../../../App/WebSocket/Events";
import { SalaData } from "../../../Shared/Components/CardSala/Mocks/SalaMocks";
import { Sala } from "../../../Shared/Types/Entidades/Sala";

export const useLobbyWS = () => {
    const [salas, setSalas] = useState<SalaData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [pendingRoomId, setPendingRoomId] = useState<string | null>(null);

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

        const onLobbyUpdate = (rooms: any[]) => {
            console.log("Salas recebidas no Lobby:", rooms);
            const mappedRooms: SalaData[] = rooms.map(room => ({
                id: room.id,
                name: room.name,
                theme: room.theme,
                players: Array.isArray(room.players) ? room.players.length : (typeof room.players === 'number' ? room.players : 0),
                maxPlayers: 8
            }));
            setSalas(mappedRooms);
        };

        const onDirectMessage = (data: { success: boolean; message: string; type?: string }) => {
            if (data.success === false) {
                setError(data.message);
                setIsJoining(false);
                setPendingRoomId(null);
            } else if (data.success === true && pendingRoomId) {
                // Sucesso! Limpamos os estados e permitimos a navegação
                setIsJoining(false);
                // Não limpamos o pendingRoomId aqui para que o efeito no Lobby possa usá-lo se necessário
                // ou limpamos se o efeito for baseado em outro estado.
            }
        };

        socket.on(SOCKET_EVENTS.LOBBY_UPDATE, onLobbyUpdate);
        socket.on(SOCKET_EVENTS.MENSAGEM_DIRETA, onDirectMessage);

        return () => {
            socket.off("connect", onConnect);
            socket.off(SOCKET_EVENTS.LOBBY_UPDATE, onLobbyUpdate);
            socket.off(SOCKET_EVENTS.MENSAGEM_DIRETA, onDirectMessage);
        };
    }, [pendingRoomId]);

    const createRoom = (data: { name: string; theme: string }) => {
        socket.emit(SOCKET_EVENTS.ROOM_CREATE, data);
    };

    const joinRoom = (codigo: string) => {
        setError(null);
        setIsJoining(true);
        setPendingRoomId(codigo);
        socket.emit(SOCKET_EVENTS.ROOM_JOIN, { codigo });
    };

    return {
        salas,
        error,
        setError,
        isJoining,
        pendingRoomId,
        setPendingRoomId,
        createRoom,
        joinRoom
    };
};
