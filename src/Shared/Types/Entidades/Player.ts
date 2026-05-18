export interface Player {
  id: string;
  name: string;
  roomId: string | null;
  connected: boolean;
  points: number;
  isHost: boolean;
  status: string;
}
