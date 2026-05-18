import React from 'react';
import './CardSala.css';
import { Users, Hash, Tag, MonitorPlay } from 'lucide-react';

import { Temas } from '../../Constants/Temas';

export interface CardSalaProps {
  id: string;
  name: string;
  theme: Temas | string;
  players: number;
  maxPlayers?: number;
  onJoin?: () => void;
}

const getTemaLabel = (tema: Temas | string) => {
  if (typeof tema === 'string') return tema;
  
  switch (tema) {
    case Temas.DISNEY: return 'Disney';
    case Temas.ANIMAIS: return 'Animais';
    case Temas.FAMILIA: return 'Família';
    default: return 'Desconhecido';
  }
};

const CardSala: React.FC<CardSalaProps> = ({ 
  id, 
  name, 
  theme, 
  players, 
  maxPlayers = 8,
  onJoin 
}) => {
  const temaLabel = getTemaLabel(theme);

  return (
    <div className="CardSala-container" id={`sala-${id}`}>
      <div className="CardSala-header">
        <div className="CardSala-code">
          <Hash size={14} />
          <span>{id}</span>
        </div>
        <div className="CardSala-players">
          <Users size={14} />
          <span>{players}/{maxPlayers}</span>
        </div>
      </div>

      <div className="CardSala-content">
        <h3 className="CardSala-name">
          <MonitorPlay size={18} className="CardSala-icon" />
          {name}
        </h3>
        <div className="CardSala-theme">
          <Tag size={14} className="CardSala-icon" />
          <span>Tema: <strong>{temaLabel}</strong></span>
        </div>
      </div>

      <button className="CardSala-button" id={`btn-join-${id}`} onClick={onJoin}>
        Entrar na Sala
      </button>
    </div>
  );
};

export default CardSala;
