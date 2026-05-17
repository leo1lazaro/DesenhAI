import { Temas } from "../../../Constants/Temas";

export interface SalaData {
    id: string;
    name: string;
    theme: Temas | string;
    players: number;
    maxPlayers: number;
}

export const SALA_MOCKS: SalaData[] = [
    {
        id: "R001",
        name: "Sala dos Iniciantes",
        theme: Temas.FAMILIA,
        players: 4,
        maxPlayers: 8
    },
    {
        id: "R002",
        name: "Mestres do Traço",
        theme: Temas.DISNEY,
        players: 8,
        maxPlayers: 8
    },
    {
        id: "R003",
        name: "Guerra de Pincéis",
        theme: Temas.ANIMAIS,
        players: 6,
        maxPlayers: 8
    }
];
