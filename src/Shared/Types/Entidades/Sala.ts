import { Player } from './Player';
import { CartaData } from '../../Components/Carta/Mocks/CartaMocks';

export interface Sala {
  id: string;
  name: string;
  theme: string;
  players: Player[];
  started: boolean;
  round: number;
  turnIndex: number;
  currentCard: CartaData | null;
  phase: string;
  currentPlayerId: string | null;
}
